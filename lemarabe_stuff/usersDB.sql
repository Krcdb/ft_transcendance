--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0 (Debian 14.0-1.pgdg110+1)
-- Dumped by pg_dump version 14.0 (Debian 14.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "userName" character varying NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    avatar character varying
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, "userName", "isActive", avatar) FROM stdin;
42	Norminet	t	\N
111	Captain	t	\N
222	Michelle	t	\N
333	Jake	t	\N
444	Mooncake	t	\N
555	Crash	t	\N
666	Destiny	t	\N
777	Gilbert	t	\N
888	Chloe	t	\N
999	Jason	t	\N
\.


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_da5934070b5f2726ebfd3122c80; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName");


--
-- PostgreSQL database dump complete
--

