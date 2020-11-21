# Typed Json Schema

Generate typescript model definitions with **just** the JSON schema.

## Motivation

Avoid typing the JSON schema and then also managing typescript types. A large differentiating factor between this library and other libraries is that we use the JSON schema as a source of truth.

If you already have JSON schemas, you can get typescript types with _little/no_ modifications. This can be particularly helpful in other libraries, especially those that are expecting JSON schemas (fastify, objection.js, etc).

## Usage

In order to use this library, your JSON schema must be declared as a type literal in Typescript. This prevents type widening. You can do this with either the `<const>` operator or using `as const` (`{} as const`). Then, you can use the `ResolvedJsonSchema` type along with the `typeof` typescript operator to create a type for your model.

```ts
import {ResolvedJsonSchema} from "typed-json-schema";

const UserSchema = <const>{
  type: "object",
  required: ["email", "password"],
  properties: {
    name: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    tags: {
      type: "array",
      items: {
        type: "string"
      }
    }
    profile: {
      type: "object",
      properties: {
        avatar: {type: "string"},
        createdYear: {type: "integer"},
        isAdmin: {type: "boolean"},
      },
    },
  },
};

type User = ResolvedJsonSchema<typeof UserSchema>;

// User is typed according to the schema above
const SampleUser: User = {
  email: "test@test.com",
  password: "very_secure_password"
}
```

## Supported Operations

- [x] String, Integer, Number, Boolean, Null types
- [ ] ~~String restrictions~~
- [x] Basic array type
- [x] Array items
- [x] Array additional items
- [ ] ~~Array min items~~
- [ ] ~~Array max items~~
- [x] Basic object type
- [x] Object properties
- [x] Object required
- [x] Object additional properties
- [ ] ~~Object min/max properties~~
- [ ] Object dependencies
- [ ] ~~Object patternProperties~~

## Alternatives:

- `@sinclair/typebox`: Specifies a builder format and allows you to get the model types back.
- `fluent-schema`: Driven by fastify. You do not get types from this and are expected to generate them yourself.
- `@bluejay/schema`: Similar to typebox. Exposes a set of utility methods to generate typed json schema definitions.