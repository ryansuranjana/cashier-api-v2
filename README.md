# Cashier API V2

## Description
Cashier is an API that provides various endpoints for managing users, categories, payments, products, and orders. It supports authentication and authorization using bearer tokens.

## Features
- Authentication
- CRUD operations for User
- CRUD operations for Category
- CRUD operations for Payment
- CRUD operations for Product
- Order Management

## API Reference

### Authentication

#### Login user `/api/login`
- Method: POST
- Body request JSON:
  | Field    | Type   | Required | Description                   |
  | -------- | ------ | -------- | ----------------------------- |
  | email    | string | yes      | User's email                  |
  | password | string | yes      | User's password (min 8 chars) |

#### Logout user `/api/logout`
- Method: POST
- Requires bearer token

### User Management

#### List users `/api/users`
- Method: GET
- Requires bearer token (Role: Admin)

#### Detail user `/api/users/{id}`
- Method: GET
- Requires bearer token (Role: Admin)

#### Create user `/api/users`
- Method: POST
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field    | Type   | Required | Description                              |
  | -------- | ------ | -------- | ---------------------------------------- |
  | email    | string | yes      | User's email                             |
  | password | string | yes      | User's password (min 8 and max 16 chars) |
  | name     | string | yes      | User's name                              |
  | role     | string | yes      | User's role (enum: admin, cashier)        |

#### Update user `/api/users/{id}`
- Method: PUT
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field    | Type   | Required | Description                              |
  | -------- | ------ | -------- | ---------------------------------------- |
  | email    | string | yes      | User's email                             |
  | password | string | yes      | User's password (min 8 and max 16 chars) |
  | name     | string | yes      | User's name                              |
  | role     | string | yes      | User's role (enum: admin, cashier)        |

#### Delete user `/api/users/{id}`
- Method: DELETE
- Requires bearer token (Role: Admin)

### Payment Management

#### List payments `/api/payments`
- Method: GET
- Requires bearer token (Role: Admin)

#### Detail payment `/api/payments/{id}`
- Method: GET
- Requires bearer token (Role: Admin)

#### Create payment `/api/payments`
- Method: POST
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field | Type   | Required | Description                                    |
  | ----- | ------ | -------- | ---------------------------------------------- |
  | name  | string | yes      | Payment name                                   |
  | type  | string | yes      | Payment type                                   |
  | logo  | file   | yes      | Payment logo (image/jpeg, image/png, image/jpg, max 1024mb) |

#### Edit payment `/api/payments/{id}`
- Method: PUT
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field    | Type   | Required | Description                                    |
  | -------- | ------ | -------- | ---------------------------------------------- |
  | name     | string | yes      | Payment name                                   |
  | type     | string | yes      | Payment type                                   |
  | logo     | file   | no       | Payment logo (image/jpeg, image/png, image/jpg, max 1024mb) |

#### Delete payment `/api/payments/{id}`
- Method: DELETE
- Requires bearer token (Role: Admin)

### Category Management

#### List categories `/api/categories`
- Method: GET
- Requires bearer token (Role: Admin)

#### Detail category `/api/categories/{id}`
- Method: GET
- Requires bearer token (Role: Admin)

#### Create category `/api/categories`
- Method: POST
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field | Type   | Required | Description            |
  | ----- | ------ | -------- | ---------------------- |
  | name  | string | yes      | Category name           |

#### Update category `/api/categories/{id}`
- Method: PUT
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field    | Type   | Required | Description            |
  | -------- | ------ | -------- | ---------------------- |
  | name     | string | yes      | Category name           |

#### Delete category `/api/categories/{id}`
- Method: DELETE
- Requires bearer token (Role: Admin)

### Product Management

#### List products `/api/products`
- Method: GET
- Requires bearer token (Role: Admin, Cashier)
- Query parameters:
  - name: string (product name)
  - category: string (category name)

#### Detail product `/api/products/{id}`
- Method: GET
- Requires bearer token (Role: Admin, Cashier)

#### Create product `/api/products`
- Method: POST
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field       | Type    | Required | Description                                                 |
  | ----------- | ------- | -------- | ----------------------------------------------------------- |
  | name        | string  | yes      | Product name                                                |
  | category_id | integer | yes      | Category ID                                                 |
  | price       | integer | yes      | Product price                                               |
  | stock       | integer | yes      | Product stock                                               |
  | sku         | string  | yes      | Product SKU                                                 |
  | image       | file    | yes      | Product image (image/jpeg, image/png, image/jpg, max 1024mb) |

#### Update product `/api/products/{id}`
- Method: PUT
- Requires bearer token (Role: Admin)
- Body request JSON:
  | Field       | Type    | Required | Description                                                 |
  | ----------- | ------- | -------- | ----------------------------------------------------------- |
  | name        | string  | yes      | Product name                                                |
  | category_id | integer | yes      | Category ID                                                 |
  | price       | integer | yes      | Product price                                               |
  | stock       | integer | yes      | Product stock                                               |
  | sku         | string  | yes      | Product SKU                                                 |
  | image       | file    | no       | Product image (image/jpeg, image/png, image/jpg, max 1024mb) |

#### Delete product `/api/products/{id}`
- Method: DELETE
- Requires bearer token (Role: Admin)

### Order Management

#### List orders `/api/orders`
- Method: GET
- Requires bearer token (Role: Admin, Cashier)

#### Detail order `/api/orders/{id}`
- Method: GET
- Requires bearer token (Role: Admin, Cashier)

#### Create order `/api/orders`
- Method: POST
- Requires bearer token (Role: Admin, Cashier)
- Body request JSON:
  | Field       | Type    | Required | Description                                                 |
  | ----------- | ------- | -------- | ----------------------------------------------------------- |
  | payment_id  | integer | yes      | Payment ID                                                  |
  | total_paid  | integer | yes      | Total amount paid                                           |
  | products    | array   |          | Array of products, each item contains product_id and qty     |
