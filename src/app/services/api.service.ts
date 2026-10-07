/**
 * @fileoverview Mock API Service for TechNuy application.
 * Replace all HTTP requests with data from data.json.
 * @author Floriansp40
 * @version 1.1.0
 */
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

// @ts-ignore
import data from './data.json';

interface CategoryWithProducts extends Category {
  products: Product[];
}

interface MockData {
  category: Category[];
  product: Product[];
  user: any[];
}

const mockData: MockData = data as any;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  /**
   * Simule la récupération des produits.
   * Filtre par categoryId si spécifié.
   * @returns Promise<Product[]>
   */
  public getProducts(categoryId: number = -1): Promise<Product[]> {
    let products = mockData.product;

    if (categoryId !== -1) {
      products = products.filter(p => p.category_id == categoryId);
    }

    return Promise.resolve(products);
  }

  /**
   * Simule la récupération des "Best Products" (best = 1).
   * @returns Promise<Product[]>
   */
  public getBestProducts(): Promise<Product[]> {
    const bestProducts = mockData.product.filter(p => p.best == 1 || p.best == true);
    return Promise.resolve(bestProducts);
  }

  /**
   * Simule la récupération des "Suggested Products" (suggested = 1).
   * @returns Promise<Product[]>
   */
  public getSuggestedProducts(): Promise<Product[]> {
    const suggestedProducts = mockData.product.filter(p => p.suggested === 1 || p.suggested === true);
    return Promise.resolve(suggestedProducts);
  }

  /**
   * Simule la récupération de TOUTES les catégories.
   * @returns Promise<Category[]>
   */
  public getCategories(): Promise<Category[]> {
    return Promise.resolve(mockData.category);
  }

  /**
   * Simule la récupération d'une catégorie par ID.
   * Avec les produits associés.
   * @returns Promise<Category>
   */
  public getCategoryWithProducts(id: number): Promise<Category> {
    const category = mockData.category.find(c => c.id === id);

    if (!category) {
      return Promise.reject(new Error(`Category with ID ${id} not found.`));
    }

    category.products = mockData.product.filter(p => p.category_id === id);
    return Promise.resolve(category);
  }

  /**
   * Simule la récupération d'une catégorie par ID.
   * @returns Promise<Category>
   */
  public getCategory(id: number): Promise<Category> {
    const category = mockData.category.filter(c => c.id == id)[0];

    if (category) {
      return Promise.resolve(category);
    }
    return Promise.reject(new Error(`Category with ID ${id} not found.`));
  }

  /**
   * Simule la récupération d'un produit par ID.
   * @returns Promise<Product>
   */
  public getProduct(id: number): Promise<Product> {
    const product = mockData.product.find(p => p.id == id);
    if (product) {
      return Promise.resolve(product);
    }
    return Promise.reject(new Error(`Product with ID ${id} not found.`));
  }
}
