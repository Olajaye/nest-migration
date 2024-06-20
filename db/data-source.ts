import { DataSource, DataSourceOptions } from "typeorm";


export const dataSourcesOptions: DataSourceOptions = {
  type: "sqlite",
  database:"db.sqlite",
  entities: ['dist/**/*.entity.js'],
  // synchronize: true,
  // migrations: ['dist/db/migrations/*.js'],
}


const dataSource = new DataSource(dataSourcesOptions)

export default dataSource;