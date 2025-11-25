# Refugee First – 72-Hour Support Agent

**A multilingual AI assistant providing critical survival information to refugees during their first 72 hours in a new city**

## Project Description

Refugee First is an AI-powered humanitarian support system designed to address the most urgent needs of refugees and displaced persons during the critical 72-hour window after arriving in an unfamiliar city. The system delivers immediate, life-saving information through accessible channels like WhatsApp and web chat, providing guidance on emergency shelter locations, food and water distribution points, medical facilities, safety protocols, and local navigation—all in the user's native language.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+
- **AI/ML**: LangGraph, Vertex AI Embeddings, Groq API
- **Database**: MongoDB with geospatial indexing
- **Messaging**: WhatsApp Cloud API
- **Translation**: Google Translate API
- **Hosting**: Google Cloud Run, Firebase Hosting
- **Languages**: Arabic, Farsi, Hindi, Urdu, English, French, Ukrainian, Tamil, Marathi

## How It Works

### System Architecture

```
User Message → WhatsApp/Web Interface → FastAPI Backend → LangGraph Agent → 
RAG System (Vertex AI) → Local Resource Database → Response Generation → 
Translation → User Response
```

### Step-by-Step Process

1. **Multilingual Input**: Refugee sends message via WhatsApp or web chat in their native language
2. **Language Detection & Translation**: System automatically detects language and translates to English for processing
3. **AI Analysis**: LangGraph agent classifies urgency level and identifies required assistance type
4. **Local Resource Retrieval**: RAG system with Vertex AI embeddings searches geospatial database for:
   - Emergency shelters and temporary housing
   - Food banks and water distribution points
   - Medical facilities and pharmacies
   - Emergency services and community support centers
5. **72-Hour Survival Planning**: AI generates customized timeline prioritizing:
   - Immediate needs (shelter, food, safety)
   - Medium-term requirements (healthcare, documentation)
   - Community integration (local support networks)
6. **Multilingual Delivery**: Response translated and delivered in user's preferred language

## Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB database
- Google Cloud Project with Vertex AI enabled
- WhatsApp Business API account

### Backend Setup
```bash
# Clone repository
git clone https://github.com/your-username/refugee-first.git
cd refugee-first/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
export MONGODB_URI="your_mongodb_connection_string"
export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account.json"
export GROQ_API_KEY="your_groq_api_key"
export WHATSAPP_TOKEN="your_whatsapp_business_token"

# Start server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

### Database Initialization
```bash
# Import humanitarian resource data
python scripts/import_shelters.py
python scripts/import_food_banks.py
python scripts/import_medical_centers.py
```

## Usage Example

### Food and Water Request (Hindi)
```
👤 User: "भूख लगी है, खाना चाहिए"

🤖 Refugee First: "नमस्ते! आपके निकटतम भोजन वितरण केंद्र:

🍞 अन्नक्षेत्र भोजनालय - 0.5 किमी (अभी खुला)
🍎 सामुदायिक रसोई - 1.2 किमी
💧 पेयजल स्टेशन - 0.3 किमी

तत्काल सहायता:
1. पहले पानी लें
2. निकटतम भोजन केंद्र पर जाएं
3. यदि अस्वस्थ हैं तो चिकित्सक से मिलें

क्या आप विशिष्ट दिशा-निर्देश चाहते हैं?"
```

## File Structure

```
refugee-first/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── agents/
│   │   ├── refugee_agent.py    # LangGraph agent implementation
│   │   └── emergency_classifier.py
│   ├── rag/
│   │   ├── retrieve.py         # RAG retrieval system
│   │   ├── vector_store.py     # Vector database management
│   │   └── data_sources/       # Local aid resources
│   ├── whatsapp/
│   │   └── webhook.py          # WhatsApp message handling
│   ├── translation/
│   │   └── multilingual.py     # Translation services
│   └── models/
│       ├── user_models.py      # User data models
│       └── aid_models.py       # Aid resource models
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── EmergencyResources.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   └── Dashboard.jsx
│   │   └── utils/
│   │       ├── api.js
│   │       └── translation.js
│   └── public/
├── database/
│   ├── init_db.py              # Database initialization
│   └── sample_data/            # Humanitarian resources
├── docker-compose.yml
├── requirements.txt
└── README.md
```

## Live Demo

**Web Portal**: [https://refugee-first.web.app](https://refugee-first.web.app)  
**Video Demonstration**: [Google Drive Link](https://drive.google.com/file/d/1EvefO1SAihRdXT55CqyduXXM3emgixbw/view)

## Humanitarian Focus

This project strictly adheres to humanitarian principles:
- ✅ Provides information only, no automation of legal processes
- ✅ Respects user privacy and data protection  
- ✅ Supports vulnerable populations without commercial motives
- ✅ Multilingual accessibility for true inclusion
- ❌ No government or legal advice
- ❌ No commercial data usage
- ❌ No surveillance capabilities

## License

Humanitarian Use License - See LICENSE.md for complete details.

---
