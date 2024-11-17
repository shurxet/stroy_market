# fast_api/app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router
from .core.database import init_db
from .exceptions import http_exception_handler

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


# Initialize the database
@app.on_event("startup")
def on_startup():
    init_db()


# Обработка исключений
app.add_exception_handler(HTTPException, http_exception_handler)
