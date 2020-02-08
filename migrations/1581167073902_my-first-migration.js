/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("views", {
    id: "id",
    name: { type: "varchar(25)", notNull: true },
    city: { type: "varchar(140)" },
    country_code: { type: "varchar(4)" }
  });
};

exports.down = pgm => {};
