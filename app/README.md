# LabTrail App

React frontend of the LabTrail application.

## Environment Variables

**.env**

```
BROWSER=none
# Optional:
REACT_APP_APOLLO_URL=https://example.org/graphql
```

# Doc

## Components

React component are not separated into folders. The file hiearchy is flat. There are several types of components.

**Route Components**

Route components match the name of the React router path.

Here are some examples for the category type:

`/category` -> `Category.js`  
`/categories` -> `Categories.js`  
`/category/:id` -> `CategoryId.js`

**CRUD Components**

Every CRUD mutation for every type has its own component.

`createCategory` -> `CategoryCreate.js`  
`updateCategory` -> `CategoryUpdate.js`  
`updateCategory` -> `CategoryUpdate.js`

**Form Components**

The form components are shared among components. They are used to display the form for specific type or a select list.

Form for category -> `CategoryForm.js`  
Select category -> `CategoryFormSelect.js`

## Fetching

Fetching data is done as least as possible.

## Cache

Every mutation is responsible to update the cache. 
