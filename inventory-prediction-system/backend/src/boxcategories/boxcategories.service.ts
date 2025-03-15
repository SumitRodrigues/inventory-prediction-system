import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class BoxCategoriesService {
  constructor(private readonly dataSource: DataSource) {}

  async getDistinctBoxCategories(): Promise<any[]> {
    try {
      const query = `SELECT DISTINCT(bc.Category) FROM test.sales_forecast sf LEFT JOIN box_categories bc ON sf.ProductId = bc.ProductId`;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result.map((category) => category.Category);
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async getProductByCategroyName(categoryId: string): Promise<any[]> {
    try {
      console.log(categoryId);
      const query = `SELECT sf.ProductId FROM test.sales_forecast sf LEFT JOIN box_categories s ON sf.ProductId = s.ProductId  WHERE s.Category='${categoryId}' LIMIT 100`;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result.map((cat) => cat.ProductId);
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async productForecast(productId: string, stockStatus: string) {
    try {
      const baseQuery = `
        SELECT 
          s.BranchName AS "Store Name",
          SUM(sf.Quantity) AS "Expected Forecast",
          COALESCE(SUM(bs.QuantityOnHand), 0) AS "Available Stock",
          CASE
            WHEN SUM(bs.QuantityOnHand) > 0  THEN ROUND(COALESCE(SUM(bs.QuantityOnHand),0)/COALESCE(SUM(sf.Quantity),0)*7)
            ELSE 0
          END AS "Turnover Time",
          CASE
            WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
            WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2) THEN 'Overstock'
            ELSE 'Understock'
          END AS "Stock Status"
        FROM sales_forecast sf
        LEFT JOIN box_categories bc ON sf.ProductID = bc.ProductID
        LEFT JOIN box_stock bs ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
        LEFT JOIN stores s ON sf.StoreId = s.BranchID
        WHERE sf.ProductID = ?
        GROUP BY sf.StoreId, s.BranchName
      `;
      const havingClause =
        stockStatus !== 'All'
          ? `HAVING 
              CASE
                WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
                WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2) THEN 'Overstock'
                ELSE 'Understock'
              END = ?`
          : '';

      const finalQuery = `${baseQuery} ${havingClause}`;
      const queryParams =
        stockStatus !== 'All' ? [productId, stockStatus] : [productId];
      console.log(finalQuery, queryParams);
      const result = await this.dataSource.query(finalQuery, queryParams); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch product forecast: ${error.message}`);
    }
  }
  async fetchOverStockCategories() {
    try {
      const query = `
      SELECT
	      bc.Category AS "Category Name",
        SUM(sf.Quantity) AS Sales,
        SUM(bs.QuantityOnHand) AS Stocks,
        ROUND(COALESCE(SUM(sf.Quantity),0)/COALESCE(SUM(bs.QuantityOnHand),0)*7) AS "Turnover Time"
      FROM sales_forecast sf
      LEFT JOIN box_categories bc
      ON sf.ProductID = bc.ProductID
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      GROUP BY bc.Category
      HAVING (SUM(bs.QuantityOnHand) - 2) > SUM(sf.Quantity)
      ORDER BY ((SUM(bs.QuantityOnHand) - 2) - SUM(sf.Quantity)) DESC
      LIMIT 5;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async fetchUnderStockCategories() {
    try {
      const query = `
      SELECT
          bc.Category AS "Category Name",
          SUM(sf.Quantity) AS Sales,
          SUM(bs.QuantityOnHand) AS Stocks,
          CASE
            WHEN SUM(bs.QuantityOnHand) > 0  THEN ROUND(COALESCE(SUM(bs.QuantityOnHand),0)/COALESCE(SUM(sf.Quantity),0)*7)
            ELSE 0
          END AS "Turnover Time"
      FROM sales_forecast sf
      LEFT JOIN box_categories bc
      ON sf.ProductID = bc.ProductID
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      GROUP BY bc.Category
      HAVING (SUM(bs.QuantityOnHand) - 2) < SUM(sf.Quantity)
      ORDER BY ((SUM(bs.QuantityOnHand) - 2) - SUM(sf.Quantity))
      LIMIT 5;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async fetchOverStockProducts() {
    try {
      const query = `
      SELECT
        sf.ProductID as "Product ID",
        SUM(sf.Quantity) AS Sales,
        SUM(bs.QuantityOnHand) AS Stocks,
        ROUND(COALESCE(SUM(bs.QuantityOnHand),0)/COALESCE(SUM(sf.Quantity),0)*7) AS "Turnover Time"
      FROM sales_forecast sf
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      GROUP BY sf.ProductID
      ORDER BY ((SUM(bs.QuantityOnHand) - 2) - SUM(sf.Quantity)) DESC
      LIMIT 5;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async fetchUnderStockProducts() {
    try {
      const query = `
      SELECT
        sf.ProductID as "Product ID",
        SUM(sf.Quantity) AS Sales,
          COALESCE(SUM(bs.QuantityOnHand), 0) AS Stocks,
        CASE
          WHEN SUM(bs.QuantityOnHand) > 0  THEN ROUND(COALESCE(SUM(bs.QuantityOnHand),0)/COALESCE(SUM(sf.Quantity),0)*7)
          ELSE 0
        END AS "Turnover Time"
      FROM sales_forecast sf
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      GROUP BY sf.ProductID
      ORDER BY ((SUM(bs.QuantityOnHand) - 2) - SUM(sf.Quantity))
      LIMIT 5;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async getPiChart() {
    try {
      const query = `
      SELECT
      bc.Category AS CategoryId,
      CASE
            WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
            WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2)  THEN 'Overstock'
            ELSE 'Understock'
        END AS StockStatus
      FROM sales_forecast sf
      LEFT JOIN box_categories bc
      ON sf.ProductID = bc.ProductID
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      GROUP BY bc.Category;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async getStoreByProductId(productId: string) {
    console.log(productId);
    try {
      const query = `
      SELECT
      sf.StoreId,
      s.BranchName
      FROM sales_forecast sf
      LEFT JOIN stores s
      ON sf.StoreId = s.BranchID
      WHERE sf.ProductId = '${productId}'
      LIMIT 100
      ;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      return result;
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
  async getGraphData() {
    try {
      const query = `
      SELECT * FROM sales_vs_stock;
      `;
      const result = await this.dataSource.query(query); // Execute the raw query
      console.log(result);
      const labels: string[] = [];
      const sales: number[] = [];
      const stocks: number[] = [];

      result.forEach((item) => {
        // Format the date
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'short',
        };
        const formattedDate = new Date(item.MonthYear).toLocaleDateString(
          'en-US',
          options,
        );

        // Push data to respective arrays
        labels.push(formattedDate);
        sales.push(Number(item.Sales)); // Convert to number for numeric operations
        stocks.push(Number(item.Stock)); // Convert to number for numeric operations
      });

      return {
        labels,
        sales,
        stocks,
      };
    } catch (error) {
      throw new Error(`Failed to fetch box categories: ${error.message}`);
    }
  }
}
