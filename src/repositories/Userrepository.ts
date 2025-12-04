import { AppDataSource } from '../typeorm.config';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

/**
 * UserRepository
 * 
 * Ähnlich zu FastAPI's CRUD Operations oder Flask-SQLAlchemy
 * 
 * In Python würdest du schreiben:
 * db.query(User).filter(User.id == id).first()
 * 
 * Hier nutzen wir TypeORM's Repository Pattern
 */
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  /**
   * Alle User abrufen
   * Python: db.query(User).all()
   */
  async findAll(): Promise<User[]> {
    return await this.repository.find();
  }

  /**
   * User nach ID finden
   * Python: db.query(User).filter(User.id == id).first()
   */
  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  /**
   * User nach Email finden
   * Python: db.query(User).filter(User.email == email).first()
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  /**
   * Neuen User erstellen
   * Python: 
   *   user = User(**data)
   *   db.add(user)
   *   db.commit()
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  /**
   * User aktualisieren
   * Python:
   *   user = db.query(User).get(id)
   *   user.name = new_name
   *   db.commit()
   */
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    Object.assign(user, userData);
    return await this.repository.save(user);
  }

  /**
   * User löschen
   * Python:
   *   user = db.query(User).get(id)
   *   db.delete(user)
   *   db.commit()
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Erweiterte Query-Beispiele:
   */
  
  // Aktive User finden
  async findActiveUsers(): Promise<User[]> {
    return await this.repository.find({ 
      where: { isActive: true } 
    });
  }

  // User nach Alter sortiert
  async findUsersSortedByAge(): Promise<User[]> {
    return await this.repository.find({ 
      order: { age: 'DESC' } 
    });
  }

  // Pagination
  async findWithPagination(page: number, limit: number): Promise<User[]> {
    return await this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}