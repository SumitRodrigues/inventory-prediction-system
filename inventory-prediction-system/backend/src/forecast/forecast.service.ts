import { Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class ForecastService {
  async getForecast(storeId: string, productId: string) {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root%401234',
      database: 'dev_days',
    });

    const [rows] = await connection.execute(
      `SELECT * FROM sales_forecast WHERE StoreId = ? AND ProductID = ?`,
      [storeId, productId]
    );

    await connection.end();
    return rows;
  }
}
