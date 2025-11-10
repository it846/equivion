import mongoose, { Schema, Model, models } from 'mongoose';

export interface ILoanApplication {
  fullName: string;
  email: string;
  phone: string;
  loanAmount: string;
  employmentType: 'Salaried' | 'Self-Employed' | 'Business Owner';
  service: string;
  createdAt: Date;
  status: 'new' | 'under-review' | 'approved' | 'rejected' | 'contacted';
  ipAddress?: string;
  notes?: string;
}

const LoanApplicationSchema = new Schema<ILoanApplication>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters'],
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
    loanAmount: {
      type: String,
      required: [true, 'Loan amount is required'],
      trim: true,
    },
    employmentType: {
      type: String,
      required: [true, 'Employment type is required'],
      enum: {
        values: ['Salaried', 'Self-Employed', 'Business Owner'],
        message: 'Employment type must be Salaried, Self-Employed, or Business Owner',
      },
    },
    service: {
      type: String,
      required: [true, 'Service type is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'under-review', 'approved', 'rejected', 'contacted'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Indexes for better query performance
LoanApplicationSchema.index({ email: 1 });
LoanApplicationSchema.index({ createdAt: -1 });
LoanApplicationSchema.index({ status: 1 });
LoanApplicationSchema.index({ service: 1 });
LoanApplicationSchema.index({ employmentType: 1 });

// Prevent model recompilation in development
const LoanApplication: Model<ILoanApplication> =
  models.LoanApplication || mongoose.model<ILoanApplication>('LoanApplication', LoanApplicationSchema);

export default LoanApplication;
