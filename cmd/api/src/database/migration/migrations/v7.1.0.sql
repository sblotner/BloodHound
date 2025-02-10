-- Copyright 2025 Specter Ops, Inc.
--
-- Licensed under the Apache License, Version 2.0
-- you may not use this file except in compliance with the License.
-- You may obtain a copy of the License at
--
--     http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software
-- distributed under the License is distributed on an "AS IS" BASIS,
-- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
-- See the License for the specific language governing permissions and
-- limitations under the License.
--
-- SPDX-License-Identifier: Apache-2.0

-- Prepend all found duplicate emails on user table with user id in preparation for unique constraint
UPDATE users SET email_address = id || '-' || lower(email_address) where lower(email_address) in (SELECT distinct(lower(email_address)) FROM users GROUP BY lower(email_address) HAVING count(lower(email_address)) > 1);

-- Add unique constraint on user emails
ALTER TABLE IF EXISTS users
  DROP CONSTRAINT IF EXISTS users_email_address_key;
ALTER TABLE IF EXISTS users
  ADD CONSTRAINT users_email_address_key UNIQUE (email_address);
