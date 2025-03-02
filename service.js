const { Client } = require("@notionhq/client");
require('dotenv').config();

const secret = process.env.SECRET;
const db = process.env.DB;

const notion = new Client({
  auth: secret,
});

const database_id = db;

module.exports = async function getPost() {
  const { results } = await notion.databases.query({
    database_id: database_id,
  });

  const post = results.map((page) => {
    return {
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      tags: page.properties.tags.multi_select,
      allProperties: page.properties
    };
  });

  return post;
};
