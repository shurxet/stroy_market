from pydantic import BaseModel


class StoreBase(BaseModel):
    name: str


class StoreCreate(StoreBase):
    pass


class StoreUpdate(StoreBase):
    pass


class Store(StoreBase):
    id: int

    class Config:
        from_attributes = True  # В Pydantic V2 заменяем orm_mode
