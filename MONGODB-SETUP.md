# MongoDB Database Integration Guide

This document outlines the MongoDB integration for storing form submissions (contact forms and loan applications) in the Equivion Financial Services website.

## Overview

The website now saves all form submissions to MongoDB while also sending email notifications. The system is designed with graceful degradation - if the database fails, emails will still be sent.

## Implementation Details

### 1. Database Connection (`lib/mongodb.ts`)

**Features:**
- Singleton connection pattern (prevents multiple connections)
- Connection pooling for better performance
- Hot reload support in development
- Automatic error handling
- Connection caching to improve performance

**Usage:**
```typescript
import connectDB from '@/lib/mongodb';
await connectDB();
```

### 2. Data Models

#### Contact Submission Model (`models/ContactSubmission.ts`)

**Schema Fields:**
- `name` (String, required) - Contact person's name
- `email` (String, required) - Email with validation
- `phone` (String, required) - Phone with 10-15 digit validation
- `service` (String, required) - Service they're interested in
- `message` (String, required) - Their message/inquiry
- `status` (String, enum) - 'new', 'contacted', 'resolved'
- `ipAddress` (String, optional) - For tracking/security
- `createdAt` (Date, auto) - Submission timestamp
- `updatedAt` (Date, auto) - Last update timestamp

**Indexes:**
- Email (ascending)
- Created date (descending) - for sorting
- Status - for filtering

**Collection Name:** `contactsubmissions`

#### Loan Application Model (`models/LoanApplication.ts`)

**Schema Fields:**
- `fullName` (String, required) - Applicant's full name
- `email` (String, required) - Email with validation
- `phone` (String, required) - Phone with 10-15 digit validation
- `loanAmount` (String, required) - Requested loan amount
- `employmentType` (String, enum) - 'Salaried', 'Self-Employed', 'Business Owner'
- `service` (String, required) - Type of loan (Business Loan, Personal Loan, etc.)
- `status` (String, enum) - 'new', 'under-review', 'approved', 'rejected', 'contacted'
- `ipAddress` (String, optional) - For tracking/security
- `notes` (String, optional) - Admin notes about the application
- `createdAt` (Date, auto) - Application submission timestamp
- `updatedAt` (Date, auto) - Last update timestamp

**Indexes:**
- Email (ascending)
- Created date (descending) - for sorting
- Status - for filtering applications
- Service - for filtering by loan type
- Employment type - for filtering

**Collection Name:** `loanapplications`

### 3. API Integration (`app/api/send-email/route.ts`)

**Workflow:**
1. Receive form submission
2. Connect to MongoDB
3. Save data to appropriate collection
4. Send email notification via Resend
5. Return success response

**Graceful Degradation:**
- If database save fails, email still sends
- Errors are logged but don't block the process
- User always gets a success response if email sends

**Data Captured:**
- All form fields
- IP address (for security/tracking)
- Timestamp (automatic via MongoDB)
- Default status ('new')

### 4. Environment Configuration

**Required Environment Variable:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**File:** `.env.local`

**Note:** Never commit the `.env.local` file to version control.

## MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (Free tier: M0 Sandbox)

### Step 2: Configure Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and strong password
4. Set user privileges to "Read and write to any database"
5. Click "Add User"

### Step 3: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Option 1: Click "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Option 2: Add your specific IP address for production
5. Click "Confirm"

### Step 4: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Choose "Node.js" and latest version
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<database>` with your database name (e.g., "equivion")

**Example Connection String:**
```
mongodb+srv://equivion_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/equivion?retryWrites=true&w=majority
```

### Step 5: Add to Environment Variables
1. Open `.env.local` file
2. Replace `your_mongodb_connection_string_here` with your actual connection string
3. Save the file
4. Restart your development server

## Database Collections

After first form submission, MongoDB will automatically create these collections:

### contactsubmissions
Stores all contact form submissions from the homepage.

**Sample Document:**
```json
{
  "_id": "ObjectId('...')",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "service": "Personal Loan",
  "message": "I need information about personal loan",
  "status": "new",
  "ipAddress": "192.168.1.1",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### loanapplications
Stores all loan application submissions from service pages.

**Sample Document:**
```json
{
  "_id": "ObjectId('...')",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "loanAmount": "₹10,00,000",
  "employmentType": "Salaried",
  "service": "Home Loan",
  "status": "new",
  "ipAddress": "192.168.1.2",
  "notes": "",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

## Querying Data

### Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Browse collections visually
4. Run queries, sort, filter

### Using MongoDB Atlas UI
1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Select your database
4. View and search records

### Sample Queries

**Get all new contact submissions:**
```javascript
db.contactsubmissions.find({ status: "new" }).sort({ createdAt: -1 })
```

**Get all loan applications for Business Loan:**
```javascript
db.loanapplications.find({ service: "Business Loan" }).sort({ createdAt: -1 })
```

**Get applications from last 7 days:**
```javascript
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

db.loanapplications.find({
  createdAt: { $gte: sevenDaysAgo }
}).sort({ createdAt: -1 })
```

**Update application status:**
```javascript
db.loanapplications.updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "approved", notes: "Approved with conditions" } }
)
```

## Status Management

### Contact Submission Statuses
- **new**: Just submitted, not yet reviewed
- **contacted**: Someone has reached out to the person
- **resolved**: Issue/inquiry has been resolved

### Loan Application Statuses
- **new**: Just submitted, not yet reviewed
- **under-review**: Being processed by the team
- **approved**: Application approved
- **rejected**: Application rejected
- **contacted**: Someone has reached out to the applicant

## Security Best Practices

1. **Never commit `.env.local` file** - Already in .gitignore
2. **Use strong database passwords** - Mix of letters, numbers, symbols
3. **Rotate passwords regularly** - Every 3-6 months
4. **Limit IP access** - Use specific IPs in production
5. **Monitor database logs** - Check for suspicious activity
6. **Backup regularly** - MongoDB Atlas does automatic backups
7. **Validate input** - Done via Mongoose schemas
8. **Sanitize data** - Mongoose prevents injection attacks

## API Endpoints

### POST `/api/send-email`

**Purpose:** Save form data and send email

**Request Body (Contact Form):**
```json
{
  "type": "contact",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "service": "Personal Loan",
  "message": "I need information"
}
```

**Request Body (Loan Application):**
```json
{
  "type": "application",
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211",
  "loanAmount": "₹10,00,000",
  "employmentType": "Salaried",
  "service": "Home Loan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully! We'll contact you soon."
}
```

## Troubleshooting

### Error: "MONGODB_URI not defined"
**Solution:** Add MONGODB_URI to `.env.local` and restart server

### Error: "MongoServerError: bad auth"
**Solution:** Check username/password in connection string

### Error: "Connection timeout"
**Solution:**
1. Check Network Access in MongoDB Atlas
2. Ensure 0.0.0.0/0 is whitelisted (development)
3. Check internet connection

### Error: "Validation failed"
**Solution:** Check that all required fields are provided and match schema

### Database not saving but emails work
**Solution:** This is expected behavior (graceful degradation). Check server logs for database error details.

## Monitoring & Analytics

### MongoDB Atlas Dashboard
- View connection statistics
- Monitor query performance
- Check database size
- Set up alerts

### Application Logs
Check console logs for:
- Connection success/failure
- Document save confirmations
- Validation errors
- Database operation times

## Future Enhancements

Potential additions to consider:

1. **Admin Dashboard**
   - View all submissions
   - Update statuses
   - Add notes
   - Export to CSV

2. **Email Notifications**
   - Send confirmation emails to users
   - Notify admins of new submissions
   - Send status updates

3. **Analytics**
   - Track conversion rates
   - Popular services
   - Peak submission times

4. **Advanced Features**
   - Duplicate detection
   - Spam filtering
   - Auto-responses
   - CRM integration

## Support

For MongoDB issues:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Atlas Support](https://www.mongodb.com/cloud/atlas/support)

For application issues:
- Check server logs in console
- Verify environment variables
- Test MongoDB connection separately
