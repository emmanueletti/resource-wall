# NOTEBOOK

## Notes

- Added resource_id to the comments schema

## Questions

- What happens if the data submitted to POST is incomplete?
- What should POST requests return?

## TODO

- [x] Detailed API map
- [x] /resources/search?u=name
- [x] avg rating for resources
- [x] POST to likes
- [x] count likes for resources
- [x] endpoint for user data
- [x] fix the `/userinfo` query
- [x] map and test `/userinfo`
- [x] verify the `/mywall` map
- [x] fix the resources router
- [x] verify the `/resources` maps
- [x] fix case-sensitivity for search
- [x] attach comments to the resource page
- [x] prevent users from liking the same resource multiple times
- [x] return user name from `GET /api/comments/search`
- [x] return an array of user names from `GET /api/users`
- [x] fix `/mywall` return value
- [x] correct the map for `POST /categories` to reflect the expectations
- [ ] update `GET /likes/search` to return an array of likes for a given `?res=id`
- [ ] update `POST /likes` to return an array of likes for the resource
- [ ] add `DELETE /likes` to delete the like for the given `resource_id`, returning the updated array of likes
- [ ] update `POST /ratings` returning an array of all ratings for the rosource
- [ ] add `PUT /ratings` to update the rating and return the array of ratings
- [ ] add `GET /categories/search` to return an array of categories for the given `?u=id` or `?res=id`
- [ ] add `GET /categories_resources/search` to return an array of connections for the given `?cat=id`
- [ ] communicate to the user that a resource is already liked

## Edge Cases

- [ ] searching for users that have similiar names
  - currently only the first match is returned

## Bugs

- when new resource is created, the database seems to be updated according to data return from the server BUT the /mywall route does not update with the newly created resource for that user
  - potentially an issue with the query?
    - was sending the wrong query, fixed
- search for users collections is case sensitive, hernando(empty) vs Hernando(6 results)
  - search was case-sensitive, fixed

## API map

Data type is `String` unless stated otherwise. Ellipsis (`...`) indicates that the returned array contains all items for the given parameter. When in doubt, check the test file.

| endpoint                               | expects                                      | returns                                                                                                                                   |
| -------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| in place                               |
| `GET /login`                           | `:id: Number`                                | Cookie, redirect                                                                                                                          |
| `POST /api/resources`                  | `{url, title, description}`                  | `[{id: Number, user_id: Number, url, title, description, created_at: Timestamp}]`                                                         |
| `GET /api/resources/search?u`          | `:username: String`                          | `[...{res_id: Number, auth_id: Number, auth_name, url, title, description, res_timestamp: Timestamp, avg_rating: String, likes: String}]` |
| `GET /api/resources/:id`               | `:res_id: Number`                            | `[{res_id: Number, auth_id: Number, auth_name, url, title, description, res_timestamp: Timestamp, avg_rating: String, likes: String}]`    |
| `POST /api/categories`                 | `{name: String}`                             | `[{id: Number, user_id: Number, name}]`                                                                                                   |
| `POST /api/categories_resources`       | `{category_id: Number, resource_id: Number}` | `[{id: Number, category_id: Number, resource_id: Number}]`                                                                                |
| `POST /api/comments`                   | `{resource_id: Number, content}`             | `[{id: Number, user_id: Number, resource_id: Number, content, created_at: Timestamp}]`                                                    |
| `GET /api/comments/search?res`         | `?res_id: Number`                            | `[...{id: Number, user_id: Number, resource_id: Number, content, created_at: Timestamp, user_name}]`                                      |
| `POST /api/ratings`                    | `{resource_id: Number, value: Number}`       | `[{id: Number, user_id: Number, resource_id: Number, value: Number}]`                                                                     |
| `POST /api/likes`                      | `{resource_id: Number}`                      | `[{id: Number, user_id: Number, resource_id: Number}]`                                                                                    |
| `GET /api/likes/search?u`              | `?user_id: Number`                           | `[...{res_id: Number, url, title, description, created_at: Timestamp, user_id: Number}]`                                                  |
| `GET /mywall`                          | Cookie                                       | `[...{res_id: Number, auth_id: Number, auth_name, url, title, description, res_timestamp: Timestamp}]`                                    |
| `GET /api/userinfo`                    | Cookie                                       | `[{name, id: Number, resources: String, likes: String}]`                                                                                  |
| `GET /api/users`                       | Nothing                                      | `[...{user_name}]`                                                                                                                        |
| work in progress                       |
| `GET /likes/search?res`                | `?res_id: Number`                            | `[...{id: Number, user_id: Number, resource_id: Number}]`                                                                                 |
| `POST /api/likes`                      | `{resource_id: Number}`                      | `[...{id: Number, user_id: Number, resource_id: Number}]`                                                                                 |
| `DELETE /api/likes`                    | `{resource_id: Number}`                      | `[...{id: Number, user_id: Number, resource_id: Number}]`                                                                                 |
| `POST /api/ratings`                    | `{resource_id: Number, value: Number}`       | `[...{id: Number, user_id: Number, resource_id: Number, value: Number}]`                                                                  |
| `PUT /api/ratings`                     | `{resource_id: Number, value: Number}`       | `[...{id: Number, user_id: Number, resource_id: Number, value: Number}]`                                                                  |
| `GET /categories/search?u`             | `?user_id: Number`                           | `[...{id: Number, user_id: Number, name}]`                                                                                                |
| `GET /categories/search?res`           | `?res_id: Number`                            | `[...{id: Number, user_id: Number, name}]`                                                                                                |
| `GET /categories_resources/search?cat` | `?cat_id: Number`                            | `[...{id: Number, category_id: Number, resource_id: Number}]`                                                                             |
