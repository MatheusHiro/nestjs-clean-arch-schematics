// ORM Entity (Persistence Model)
// This is the database representation using your ORM (TypeORM, Prisma, Mongoose, etc.)
// TODO: Add your ORM decorators (@Entity, @Column, @PrimaryGeneratedColumn, etc.)

/**
 * <%= classify(name) %> ORM Entity
 * Represents the database table structure
 * Contains persistence-specific fields (id, createdAt, updatedAt, etc.)
 */
export class <%= classify(name) %>OrmEntity {
  id: string;
  
  // TODO: Add your ORM-specific fields here
  // Example with TypeORM:
  // @Column()
  // name: string;
  
  // Persistence fields (timestamps, soft delete, etc.)
  createdAt: Date;
  updatedAt: Date;
  // deletedAt?: Date; // For soft deletes

  constructor(partial?: Partial<<%= classify(name) %>OrmEntity>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
