from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    AZURE_OPENAI_ENDPOINT: str = ''
    AZURE_OPENAI_KEY: str = ''
    AZURE_OPENAI_API_VERSION: str = ''
    
    model_config = SettingsConfigDict(env_file="env")