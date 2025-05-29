CREATE TYPE "public"."userType" AS ENUM('member', 'admin');--> statement-breakpoint
CREATE TABLE "cityTable" (
	"cityId" serial PRIMARY KEY NOT NULL,
	"cityName" text,
	"stateId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "restaurantOwnerTable" (
	"restaurantOwnerId" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer NOT NULL,
	"ownerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurantTable" (
	"restaurantId" serial PRIMARY KEY NOT NULL,
	"restaurantName" text,
	"streetAddress" text,
	"zipCode" text,
	"cityId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stateTable" (
	"stateId" serial PRIMARY KEY NOT NULL,
	"stateName" text,
	"stateCode" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userTable" (
	"userId" serial PRIMARY KEY NOT NULL,
	"fullName" varchar,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"userType" "userType" DEFAULT 'member',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "cityTable" ADD CONSTRAINT "cityTable_stateId_stateTable_stateId_fk" FOREIGN KEY ("stateId") REFERENCES "public"."stateTable"("stateId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwnerTable" ADD CONSTRAINT "restaurantOwnerTable_restaurantId_restaurantTable_restaurantId_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("restaurantId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantOwnerTable" ADD CONSTRAINT "restaurantOwnerTable_ownerId_userTable_userId_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "restaurantTable" ADD CONSTRAINT "restaurantTable_cityId_cityTable_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "public"."cityTable"("cityId") ON DELETE cascade ON UPDATE no action;