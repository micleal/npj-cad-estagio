// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `npj-cadastros-estagio_${name}`,
);

export const user = createTable("user", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  ra: d.text("ra").unique(),
  emailVerified: d
    .boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: d.text("image"),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: d
    .text("role", { enum: ["user", "admin", "student"] })
    .$defaultFn(() => "user"),
  banned: d.boolean("banned"),
  banReason: d.text("ban_reason"),
  banExpires: d.timestamp("ban_expires"),
  displayUsername: d.text("display_username"),
}));

export const session = createTable("session", (d) => ({
  id: d.text("id").primaryKey(),
  expiresAt: d.timestamp("expires_at").notNull(),
  token: d.text("token").notNull().unique(),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d.timestamp("updated_at", { withTimezone: true }).notNull(),
  ipAddress: d.text("ip_address"),
  userAgent: d.text("user_agent"),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: d.text("impersonated_by"),
}));

export const account = createTable("account", (d) => ({
  id: d.text("id").primaryKey(),
  accountId: d.text("account_id").notNull(),
  providerId: d.text("provider_id").notNull(),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.text("access_token"),
  refreshToken: d.text("refresh_token"),
  idToken: d.text("id_token"),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
  scope: d.text("scope"),
  password: d.text("password"),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
}));

export const verification = createTable("verification", (d) => ({
  id: d.text("id").primaryKey(),
  identifier: d.text("identifier").notNull(),
  value: d.text("value").notNull(),
  expiresAt: d.timestamp("expires_at").notNull(),
  createdAt: d
    .timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: d
    .timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date()),
}));

export const company = createTable("company", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  cnpj: d.text("cnpj").notNull().unique(),
  description: d.text("description"),
  website: d.text("website"),
  address: d.text("address"),
  city: d.text("city"),
  state: d.text("state"),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const internship = createTable("internship", (d) => ({
  id: d.text("id").primaryKey(),
  title: d.text("title").notNull(),
  description: d.text("description").notNull(),
  requirements: d.text("requirements"),
  benefits: d.text("benefits"),
  startDate: d.timestamp("start_date"),
  endDate: d.timestamp("end_date"),
  status: d
    .text("status")
    .notNull()
    .$defaultFn(() => "open"),
  companyId: d
    .text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const application = createTable("application", (d) => ({
  id: d.text("id").primaryKey(),
  status: d
    .text("status")
    .notNull()
    .$defaultFn(() => "pending"),
  resume: d.text("resume"),
  coverLetter: d.text("cover_letter"),
  internshipId: d
    .text("internship_id")
    .notNull()
    .references(() => internship.id, { onDelete: "cascade" }),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const studentProfile = createTable("student_profile", (d) => ({
  id: d.text("id").primaryKey(),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  course: d.text("course").notNull(),
  semester: d.integer("semester").notNull(),
  institution: d.text("institution").notNull(),
  graduationDate: d.timestamp("graduation_date"),
  skills: d.text("skills").array(),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const studentInfo = createTable("student_info", (d) => ({
  id: d
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: d.text("name").notNull(),
  ra: d.text("ra").notNull().unique(), // Registro Acadêmico
  course: d.text("course"),
  semester: d.integer("semester"),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const dailyScheduleLimit = createTable("daily_schedule_limit", (d) => ({
  id: d
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  date: d.date("date").notNull().unique(),
  maxRegistrations: d
    .integer("max_registrations")
    .notNull()
    .$defaultFn(() => 10),
  currentRegistrations: d
    .integer("current_registrations")
    .notNull()
    .$defaultFn(() => 0),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const attendanceSchedule = createTable("attendance_schedule", (d) => ({
  id: d
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  studentId: d
    .text("student_id")
    .notNull()
    .references(() => studentInfo.id, { onDelete: "cascade" }),
  scheduledDate: d
    .timestamp("scheduled_date", { withTimezone: true })
    .notNull(),
  status: d
    .text("status", {
      enum: ["scheduled", "attended", "absent", "cancelled"],
    })
    .notNull()
    .$defaultFn(() => "scheduled"),
  attendanceType: d
    .text("attendance_type", {
      enum: ["registration", "verification", "other"],
    })
    .notNull(),
  notes: d.text("notes"),
  verifiedBy: d.text("verified_by").references(() => user.id),
  verifiedAt: d.timestamp("verified_at", { withTimezone: true }),
  dailyScheduleId: d
    .text("daily_schedule_id")
    .notNull()
    .references(() => dailyScheduleLimit.id),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));

export const attendanceReport = createTable("attendance_report", (d) => ({
  id: d.text("id").primaryKey(),
  title: d.text("title").notNull(),
  startDate: d.timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: d.timestamp("end_date", { withTimezone: true }).notNull(),
  generatedBy: d
    .text("generated_by")
    .notNull()
    .references(() => user.id),
  reportData: d.jsonb("report_data").notNull(), // Armazena os dados do relatório em formato JSON
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
}));
