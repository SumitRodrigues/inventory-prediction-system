import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(private readonly dataSource: DataSource) {}

  async getStores(): Promise<any[]> {
    try {
      const query = `
        SELECT s.BranchName, s.BranchID
        FROM sales_forecast  sf
        INNER JOIN stores s ON sf.StoreId = s.BranchID;
      `;
      const result = await this.dataSource.query(query); // Fetch only BranchName
      return result; // Extract BranchName values into an array
      // .map((store) => store.BranchName)
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }
  async getStoreForecastbyStoreId(storeId): Promise<any[]> {
    try {
      const query = `
      SELECT
        bc.Category AS "Category Name",
        COALESCE(SUM(sf.Quantity), 0) AS "Forecasted Sale",
        COALESCE(SUM(bs.QuantityOnHand), 0) AS "Available Stock",
        CASE
          WHEN SUM(bs.QuantityOnHand) > 0  THEN ROUND(COALESCE(SUM(bs.QuantityOnHand),0)/COALESCE(SUM(sf.Quantity),0)*7)
          ELSE 0
        END AS "Turnover Time",
        CASE
          WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
          WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2)  THEN 'Overstock'
          ELSE 'Understock'
        END AS "Stock Status"
      FROM sales_forecast sf
      LEFT JOIN box_categories bc
      ON sf.ProductID = bc.ProductID
      LEFT JOIN box_stock bs
      ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
      WHERE sf.StoreId = ${storeId}
      GROUP BY bc.Category;
      `;
      const result = await this.dataSource.query(query); // Fetch only BranchName
      return result; // Extract BranchName values into an array
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }

  async inventoryStocksByProductId(productId): Promise<any[]> {
    try {
      const query = `
       SELECT
		sf.StoreId,
          s.Latitude,
          s.Longitude,
          s.BranchName AS "BranchName",
         SUM(sf.Quantity) AS "Expected Forecast",
          COALESCE(SUM(bs.QuantityOnHand), 0) AS "Available Stock",
          CASE
            WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
            WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2) THEN 'Overstock'
            ELSE 'Understock'
          END AS "StockStatus"
        FROM sales_forecast sf
        LEFT JOIN box_categories bc ON sf.ProductID = bc.ProductID
        LEFT JOIN box_stock bs ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
        LEFT JOIN stores s ON sf.StoreId = s.BranchID
        WHERE sf.ProductID = '${productId}'
        GROUP BY sf.StoreId, s.BranchName, s.Latitude, s.Longitude;
      `;
      const result = await this.dataSource.query(query); // Fetch only BranchName
      return result; // Extract BranchName values into an array
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }
  async getInventoryStores(productId, stockStatus, storeId): Promise<any[]> {
    try {
      const query = `
      WITH NearbyStores AS (
    SELECT 
        s2.BranchID AS NearbyStoreID,
        (
            6371 * ACOS(
                COS(RADIANS(s1.Latitude)) * COS(RADIANS(s2.Latitude)) *
                COS(RADIANS(s2.Longitude) - RADIANS(s1.Longitude)) +
                SIN(RADIANS(s1.Latitude)) * SIN(RADIANS(s2.Latitude))
            )
        ) AS DistanceInKm
    FROM stores s1
    JOIN stores s2
    ON s1.BranchID != s2.BranchID
    WHERE s1.BranchID = ${storeId} -- Replace with the given store ID
    HAVING DistanceInKm <= 200 -- Adjust the radius as needed (e.g., 200 km)
    ORDER BY DistanceInKm
)
SELECT
    sf.StoreId,
    s.BranchName AS "Name",
    s.Latitude AS "lat",
    s.Longitude AS "lng",
    (SUM(sf.Quantity) + 2) AS "Expected Forecast",
    COALESCE(SUM(bs.QuantityOnHand), 0) AS "Available Stock",
    CASE
        WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
        WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2) THEN 'Overstock'
        ELSE 'Understock'
    END AS "Stock Status"
FROM sales_forecast sf
LEFT JOIN box_categories bc ON sf.ProductID = bc.ProductID
LEFT JOIN box_stock bs ON sf.ProductID = bs.ProductID AND sf.StoreId = bs.StoreId
LEFT JOIN stores s ON sf.StoreId = s.BranchID
JOIN NearbyStores ns ON sf.StoreId = ns.NearbyStoreID
WHERE sf.ProductID = '${productId}'
GROUP BY sf.StoreId, s.BranchName, s.Latitude, s.Longitude
HAVING
    CASE
        WHEN SUM(sf.Quantity) = (SUM(bs.QuantityOnHand) - 2) THEN 'Balanced'
        WHEN SUM(sf.Quantity) < (SUM(bs.QuantityOnHand) - 2) THEN 'Overstock'
        ELSE 'Understock'
    END = '${stockStatus}';
    `;
      const result = await this.dataSource.query(query); // Fetch only BranchName
      return result; // Extract BranchName values into an array
      // const query = `
      //   SELECT s.BranchID AS "id", s.BranchName AS "name", '' AS address, s.Latitude as "lat", s.Longitude as "long"
      //   FROM sales_forecast  sf
      //   INNER JOIN stores s ON sf.StoreId = s.BranchID;
      // `;
      // const result = await this.dataSource.query(query); // Fetch only BranchName
      // return result.map((store: any, index: number) => ({
      //   id: (index + 1).toString(), // Transforming index to string and making it 1-based
      //   name: `${store.name}, United Kingdom`, // Adding "United Kingdom" to name
      //   address: store.address,
      //   position: {
      //     lat: parseFloat(store.lat), // Converting lat to a number
      //     lng: parseFloat(store.long), // Converting long to a number
      //   },
      // }));
      // return result; // Extract BranchName values into an array
      // .map((store) => store.BranchName)
    } catch (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }
  }
}
