-- CreateTable
CREATE TABLE "Landlord" (
    "id" TEXT NOT NULL,
    "landlordID" TEXT NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT,
    "propertyLocation" TEXT[],

    CONSTRAINT "Landlord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "tenantID" TEXT NOT NULL,
    "landlordID" TEXT NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT,
    "propertyLocation" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "moveInDate" TEXT NOT NULL,
    "rentFee" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandlordExpense" (
    "id" TEXT NOT NULL,
    "landlordID" TEXT NOT NULL,
    "tenantID" TEXT NOT NULL,
    "tenantName" TEXT NOT NULL,
    "propertyLocation" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "items" TEXT[],
    "totalAmount" TEXT NOT NULL,
    "amountPaid" TEXT NOT NULL,
    "amountDue" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "LandlordExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DepositeExpense" (
    "id" TEXT NOT NULL,
    "landlordID" TEXT NOT NULL,
    "tenantID" TEXT NOT NULL,
    "tenantName" TEXT NOT NULL,
    "propertyLocation" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "items" TEXT[],
    "depositedAmount" TEXT NOT NULL,
    "expendedAmount" TEXT NOT NULL,
    "depositedDate" TEXT NOT NULL,

    CONSTRAINT "DepositeExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expenditure" (
    "id" TEXT NOT NULL,
    "items" TEXT[],
    "amount" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "expenseBy" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "tenantID" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "receivedFrom" TEXT NOT NULL,
    "paidTo" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "monthPaidFor" TEXT NOT NULL,
    "paymentDate" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "receivedFromPhoneNumber" TEXT NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);
