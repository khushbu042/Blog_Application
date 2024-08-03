import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite';

class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL) // Your API Endpoint
        .setProject(conf.appwriteProjectId); //Your project ID
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status, 
                    userId,
                }
            )
            return result;
        }catch(error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            const result = await databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage, 
                    status
                }
            );
            return result;
        }
        catch(error){
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;   
        } catch (error) {
            throw error
            
        }
    }

    async getPost(slug){
        try {
            const result = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return result;   
        } catch (error) {
            throw error 
        }

    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            return result;
        } catch (error) {
            throw error;
        }
    }

    // file upload service
    async uploadFile(file){
        try {
            const result = await this.storage.createFile(
               conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return result   
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;   
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }
}

const service = new Service()

export default service;