import {ArrayType} from "../array/array";
import {
  BooleanType,
  IntegerType,
  NullType,
  NumberType,
  StringType,
} from "../basics";
import {ObjectType} from "../object/object";
import {JsonSchema, ResolvedJsonSchema} from "./json_schema";

type ExtractType<T extends {type: string}> = T["type"];

export type TypeName =
  | ExtractType<StringType>
  | ExtractType<NumberType>
  | ExtractType<IntegerType>
  | ExtractType<BooleanType>
  | ExtractType<NullType>
  | ExtractType<ArrayType>
  | ExtractType<ObjectType>;

export type MultiType = {
  type: readonly TypeName[];
};

export type Check<A1 extends any, A2 extends any> = A1 extends A2 ? A1 : A2;

type TypeResolution<T> = T extends TypeName
  ? {type: T} extends JsonSchema
    ? ResolvedJsonSchema<Check<{type: T}, JsonSchema>>
    : never
  : never;

export type ResolvedMultiType<T extends MultiType> = TypeResolution<
  T["type"][number]
>;