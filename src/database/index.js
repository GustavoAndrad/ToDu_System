import knexfile from "../../knexfile.cjs";
import knex from "knex";

export default knex(knexfile["development"]);