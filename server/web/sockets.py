# backend/web/sockets.py

import logging
from typing import Dict
from fastapi import WebSocket, WebSocketDisconnect
import asyncio

from graph import create_graph

graph = create_graph()
logger = logging.getLogger("websocket")

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections[session_id] = websocket
        logger.info(f"Web client connected → {session_id[:8]}")

    def disconnect(self, session_id: str):
        self.active_connections.pop(session_id, None)
        logger.info(f"Web client disconnected → {session_id[:8]}")

    async def send_text(self, message: str, session_id: str):
        ws = self.active_connections.get(session_id)
        if ws and message.strip():
            try:
                await ws.send_text(message)
            except:
                self.disconnect(session_id)

manager = ConnectionManager()

async def process_message(raw_message: str, session_id: str):
    """Fixed version — handles bool, None, and missing keys safely"""
    try:
        async for event in graph.astream_events(
            input={"raw_message": raw_message, "session_id": session_id},
            version="v2",
        ):
            # SAFELY extract final_response — this is the key fix
            data_output = event.get("data", {}).get("output", {})
            
            # data_output can be bool, str, None, or dict — handle ALL cases
            if isinstance(data_output, dict) and "final_response" in data_output:
                response = data_output["final_response"]
                if response and isinstance(response, str):
                    await manager.send_text(response, session_id)
                    return

        # If no final_response found → send fallback
        await manager.send_text(
            "I'm having trouble responding right now. Please try again in a moment.",
            session_id
        )

    except Exception as e:
        logger.error(f"Graph error for {session_id[:8]}: {e}")
        await manager.send_text("Sorry, something went wrong. Please try again.", session_id)