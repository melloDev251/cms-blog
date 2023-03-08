"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
const category_service_1 = require("../category/category.service");
let PostService = class PostService {
    constructor(repo, catService) {
        this.repo = repo;
        this.catService = catService;
    }
    async create(createPostDto, user) {
        const post = new post_entity_1.Post();
        post.userId = user.id;
        Object.assign(post, createPostDto);
        this.repo.create(post);
        return await this.repo.save(post);
    }
    async findAll(query) {
        const myQuery = this.repo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.user', 'user');
        if (!(Object.keys(query).length === 0) && query.constructor === Object) {
            const queryKeys = Object.keys(query);
            if (queryKeys.includes('slug')) {
                myQuery.where('post.slug LIKE :slug', { slug: `%${query['slug']}%` });
            }
            if (queryKeys.includes('sort')) {
                myQuery.orderBy('post.title', query['sort'].toUpperCase());
            }
            if (queryKeys.includes('category')) {
                myQuery.andWhere('category.title = :cat', { cat: query['category'] });
            }
            return await myQuery.getMany();
        }
        else {
            return await myQuery.getMany();
        }
    }
    async findOne(id) {
        try {
            const post = await this.repo.findOneOrFail(id);
            return post;
        }
        catch (err) {
            throw new common_1.BadRequestException('Post not found');
        }
    }
    async findBySlug(slug) {
        try {
            const post = await this.repo.findOne({ slug });
            return post;
        }
        catch (err) {
            throw new common_1.BadRequestException(`Post with slug ${slug} not found`);
        }
    }
    async update(slug, updatePostDto) {
        const post = await this.repo.findOne({ slug });
        if (!post) {
            throw new common_1.BadRequestException('post not found');
        }
        post.modifiedOn = new Date(Date.now());
        post.category = updatePostDto.category;
        Object.assign(post, updatePostDto);
        return this.repo.save(post);
    }
    async remove(id) {
        const post = await this.repo.findOne(id);
        await this.repo.remove(post);
        return { success: true, post };
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map