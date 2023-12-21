import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateMealTable1612345678901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'meal',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar', isNullable: false },
                { name: 'product_detail', type: 'text', isNullable: true },
                { name: 'listing_page', type: 'varchar', isNullable: true },
                { name: 'price', type: 'float', isNullable: true },
                { name: 'typeId', type: 'int' },
                { name: 'groupId', type: 'int' },
                { name: 'image', type: 'varchar', isNullable: false },
                { name: 'tailor_meal', type: 'varchar',  isNullable: true },
                { name: 'serving', type: 'float', isNullable: false },
                { name: 'instructions', type: 'text', isNullable: true },
                { name: 'features', type: 'text', isNullable: true },
                { name: 'ingredients', type: 'text', isNullable: true },
            ],
        }), true);

        // Foreign keys
        await queryRunner.createForeignKey('meal', new TableForeignKey({
            columnNames: ['typeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'meal_type',
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('meal', new TableForeignKey({
            columnNames: ['groupId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'meal_group',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('meal', true);
    }

}
