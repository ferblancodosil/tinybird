# Tinybird

## Steps to install

```
    yarn install
```

## Steps to run dev

```
    yarn serve
```

## Steps to run cypress tests

```
    yarn serve
    yarn cypress
```

## Table Logic

To create a table is necessary add in our html code a tag table similar this:

```
<table tinybird-table query="Select SUM(total_amount) from _"></table>
```

The query attribute have the posibility to listen params. We should add in the query the tags ':where' and ':limit' to enable this option.

```
<table tinybird-table query="Select SUM(total_amount) from _ :where :limit"></table>
```

* attribute :where: with this param in the query our component will be listen the url params 'filters'
* attribute :limit with this param in the query our component will be listen the url params 'from' and 'to'. If not exist urls params but we add in the query this attribute by default will be use 0 and 50

Example: http://localhost?filters=param>1&otherparam=1&from=0&to10 our query will transform in

````
WHERE param>1 AND otherparam=1 limit 0, 10
````  


## Next steps

- Add i18n to have better UX, for example in title field
- Add pagination option. In this moment, the table only work with the limit added in the url
- Columns shall sort the rows by clicking on them.
- Add more test
