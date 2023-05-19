from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    
    favorites = db.relationship('Favorite', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "favorites": [favorite.animal.serialize() for favorite in self.favorites]
        }

class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(120), unique=False, nullable=False)
    url = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Animal {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "url": self.url,
        }

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    animal_id = db.Column(db.Integer, db.ForeignKey('animal.id'), nullable=False)

    animal = db.relationship('Animal', backref='favorites', lazy=True)

    def __repr__(self):
        return f'<Favorite {self.id}>'



