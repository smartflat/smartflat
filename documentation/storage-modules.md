# Storage modules

Storage modules are used to allow SmartFlat to persist sensor & user data.

## Types

| Name     | Purpose                                | Persistance required? |
|:---------|:---------------------------------------|:----------------------|
| users    | username, password, permissions, etc.  | :white_check_mark:    |
| settings | SmartFlat settings. Required.          | :white_check_mark:    |
| devices  | device configurations, not sensor data | :white_check_mark:    |
| sensor   | sensor data                            | :x:                   |
| logs     | generic stuff like "module installed"  | :x:                   |

## API

```javascript
export default ({api}) => ({
	subscribe: {
		user: async (type, id, data) => {/*...*/}
	},
	provide: {
		user: async (type, id) => {/*...*/}
	}
})
```

## Caveats

1. Multiple storage modules may subscribe to a type, but only one per type can provide data.
