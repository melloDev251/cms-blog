import { Category } from '../../category/entities/category.entity';
import { User } from '../../auth/entities/user.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    categoryId: number;
    userId: number;
    category: Category;
    user: User;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    slugifyPost(): void;
}
