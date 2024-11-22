import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: true, // Ensure the product name is unique
      validate: {
        validator: function (value: string) {
          // Check if the product name is in capitalize format
          const nameCapitalized =
            value.charAt(0).toUpperCase() + value.slice(1);
          return nameCapitalized === value;
        },
        message:
          '{VALUE} is not a capitalize format, please product name start with capital letter',
      },
    },
    brand: {
      type: String,
      required: [true, 'Product brand is required'],
      trim: true,
      validate: {
        validator: function (value: string) {
          // Check if the brand name is in capitalize format
          const brandCapitalized =
            value.charAt(0).toUpperCase() + value.slice(1);
          return brandCapitalized === value;
        },
        message:
          '{VALUE} is not a capitalize format, please brand name start with capital letter',
      },
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      validate: {
        validator: function (value: number) {
          // Check if the price is greater than or equal to 0
          return value >= 0;
        },
        message: '{VALUE} must be greater than or equal to 0',
      },
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [500, 'Product description must be less than 500 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      validate: {
        validator: function (value: number) {
          // Check if the quantity is greater than or equal to 0
          return value >= 0;
        },
        message: '{VALUE} must be greater than or equal to 0',
      },
    },
    inStock: {
      type: Boolean,
      required: [true, 'Product inStock is required'],
    },
  },
  {
    timestamps: true,
  },
);

// Create the Mongoose model
export const Product = model<TProduct>('Product', productSchema);