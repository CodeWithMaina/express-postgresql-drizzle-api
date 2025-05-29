import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, serial,text, timestamp,integer,varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("userType",['member','admin'])
 
// State table 1
export const stateTable = pgTable('stateTable',{
    stateId: serial('stateId').primaryKey(),
    stateName: text('stateName'),
    stateCode: text('stateCode'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});
 
 
// City table 2
export const cityTable = pgTable('cityTable', {
    cityId: serial('cityId').primaryKey(),
    cityName: text('cityName'),
    stateId: integer('stateId').notNull().references(()=>stateTable.stateId,{onDelete: 'cascade'}), //fk ref is in stateTable
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});
 
// Restaurant table 3
export const restaurantTable = pgTable('restaurantTable', {
    restaurantId: serial('restaurantId').primaryKey(),
    restaurantName: text('restaurantName'),
    streetAddress: text('streetAddress'),
    zipCode: text('zipCode'),
    cityId: integer('cityId').notNull().references(()=>cityTable.cityId,{onDelete: 'cascade'}),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});
 
// User table 4
export const userTable = pgTable( "userTable",{
    userId: serial("userId").primaryKey(),
    fullName: varchar("fullName"),
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
    userType: roleEnum("userType").default('member'),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});
 
// Restaurant_owner 5
export const restaurantOwnerTable = pgTable('restaurantOwnerTable', {
    restaurantOwnerId: serial('restaurantOwnerId').primaryKey(),
    restaurantId: integer("restaurantId").notNull().references(()=>restaurantTable.restaurantId,{onDelete:'cascade'}),
    ownerId: integer('ownerId').notNull().references(()=>userTable.userId,{onDelete:'cascade'}),
});
 
 
//Infer Types
 
export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;
 
export type TStateInsert = typeof stateTable.$inferInsert;
export type TStateSelect = typeof stateTable.$inferSelect;
 
export type TCityInsert = typeof cityTable.$inferInsert;
export type TCitySelect = typeof cityTable.$inferSelect;
 
export type TRestaurantInsert = typeof restaurantTable.$inferInsert;
export type TRestaurantSelect = typeof restaurantTable.$inferSelect;
 
export type TRestaurantOwnerInsert = typeof restaurantOwnerTable.$inferInsert;
export type TRestaurantOwnerSelect = typeof restaurantOwnerTable.$inferSelect;
 
 
 
// one to one rln
//relation btn city(1) --> (1)state
export const cityStateRelation = relations(cityTable, ({ one }) => ({
    state: one(stateTable, {
        fields: [cityTable.stateId],
        references: [stateTable.stateId]
    })
}));
 
// many to one rln
//relation between state(1) --> (n)cities
export const stateCityRelation = relations(stateTable, ({ many }) => ({
    cities: many(cityTable)
}));
 
 
// one to one rln
//relation btn restaurant(1) --> (1)city
export const restaurantCityRelation = relations(restaurantTable,({one})=>({
    cities: one(cityTable,{
        fields:[restaurantTable.cityId],
        references:[cityTable.cityId]
    })
}))
 
// many to one rln
// relation between city(1) --> (n)restaurant
export const cityRestaurantRelation = relations(cityTable, ({ many }) => ({
    restaurants: many(restaurantTable)
}));
 
 
 
// restaurantOwnerTable → userTable (many owners can point to the same user)
export const restaurantOwnerUserRelation = relations(restaurantOwnerTable, ({ one }) => ({
    user: one(userTable, {
        fields: [restaurantOwnerTable.ownerId],
        references: [userTable.userId]
    })
}));
 
// userTable → restaurantOwnerTable (a user can own many restaurants)
export const userRestaurantOwnersRelation = relations(userTable, ({ many }) => ({
    ownedRestaurants: many(restaurantOwnerTable)
}));
 
 
 
// restaurantOwnerTable → restaurantTable (many owners can point to the same restaurant)
export const restaurantOwnerRestaurantRelation = relations(restaurantOwnerTable, ({ one }) => ({
    restaurant: one(restaurantTable, {
        fields: [restaurantOwnerTable.restaurantId],
        references: [restaurantTable.restaurantId]
    })
}));
 
// restaurantTable → restaurantOwnerTable (a restaurant can have many owners)
export const restaurantOwnersRelation = relations(restaurantTable, ({ many }) => ({
    owners: many(restaurantOwnerTable)
}));