# backend/web/routes.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio                                 # ← THIS WAS MISSING!!!
from .sockets import manager, process_message

router = APIRouter()

@router.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    try:
        while True:
            data = await websocket.receive_text()   # ← raw text, correct
            if not data.strip():
                continue

            # This now works because asyncio is imported
            asyncio.create_task(process_message(data, session_id))

    except WebSocketDisconnect:
        manager.disconnect(session_id)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(session_id)