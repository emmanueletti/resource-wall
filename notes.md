# NOTEBOOK

## Notes

- Added resource_id to the comments schema

## Questions

- What happens if the data submitted to POST is incomplete?
- What should POST requests return?
- Do we need GET responses for POST endpoints?
- How exactly should GET requests return data (joined, split, array of IDs for comments etc.)
- Is there a need for `/me` in `/resources`, `/likes`, and `/comments`?

## TODO

- [x] Detailed API map
- [x] /resources/search?u=name
- [x] avg rating for resources
- [x] POST to likes

## API map

Data type is `String` unless stated otherwise

| endpoint | expects | returns|
|---|---|---|
|`GET /login`|`:id: Number`|Cookie, redirect|
|`POST /api/resources`|`{url, title, description}`|`[{id: Number, user_id: Number, url, title, description, created_at: Timestamp}]`|
|`GET /api/resources/search`|`:username: String`|`[{res_id: Number, auth_id: Number, url, title, description, res_timestamp: Timestamp, avg_rating: String}]`|
|`GET /api/resources`|`:res_id: Number`|`[{res_id: Number, auth_id: Number, url, title, description, res_timestamp: Timestamp, avg_rating: String}]`|
|`POST /api/categories`|`{category_id: Number, resource_id: Number}`|`[{id: Number, user_id: Number, name}]`|
|`POST /api/categories_resources`|`{category_id: Number, resource_id: Number}`|`[{id: Number, category_id: Number, resource_id: Number}`]|
|`POST /api/comments`|`{resource_id: Number, content}`|`[{id: Number, user_id: Number, resource_id: Number, content, created_at: Timestamp}]`|
|`GET /api/comments/search`|`?res: Number`|`[{id: Number, user_id: Number, resource_id: Number, content, created_at: Timestamp}]`|
|`POST /api/ratings`|`{resource_id: Number, value: Number}`|`[{id: Number, user_id: Number, resource_id: Number, value: Number}]`|
|`POST /api/likes`|`{resource_id: Number}`|`[{id: Number, user_id: Number, resource_id: Number}]`|
|`GET /api/likes/search`|`?u: Number`|`[{res_id: Number, url, title, description, created_at: Timestamp, user_id: Number}]`|
|`GET /mywall`|Cookie|`[{res_id: Number, auth_id: Number, url, title, description, res_timestamp: Timestamp, avg_rating: String, liked_id: Number}]`|