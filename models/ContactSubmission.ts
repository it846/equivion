import mongoose, { Schema, Model, models } from 'mongoose';

export interface IContactSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'contacted' | 'resolved';
  ipAddress?: string;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9]{10,15}$/, 'Please provide a valid phone number'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
ContactSubmissionSchema.index({ email: 1 });
ContactSubmissionSchema.index({ createdAt: -1 });
ContactSubmissionSchema.index({ status: 1 });

// Prevent model recompilation in development
const ContactSubmission: Model<IContactSubmission> =
  models.ContactSubmission || mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
