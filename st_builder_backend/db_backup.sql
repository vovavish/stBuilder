--
-- PostgreSQL database dump
--

-- Dumped from database version 17.1 (Debian 17.1-1.pgdg120+1)
-- Dumped by pg_dump version 17.1 (Debian 17.1-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: File; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."File" (
    id integer NOT NULL,
    path text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."File" OWNER TO postgres;

--
-- Name: File_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."File_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."File_id_seq" OWNER TO postgres;

--
-- Name: File_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."File_id_seq" OWNED BY public."File".id;


--
-- Name: Layouts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Layouts" (
    id integer NOT NULL,
    layout_data text NOT NULL,
    name text NOT NULL,
    description text DEFAULT 'default description'::text NOT NULL,
    path_to_image text DEFAULT '1737230908287-767188248.png'::text NOT NULL
);


ALTER TABLE public."Layouts" OWNER TO postgres;

--
-- Name: Layouts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Layouts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Layouts_id_seq" OWNER TO postgres;

--
-- Name: Layouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Layouts_id_seq" OWNED BY public."Layouts".id;


--
-- Name: UsersSites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UsersSites" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    site_data text NOT NULL,
    site_address text,
    site_name text NOT NULL
);


ALTER TABLE public."UsersSites" OWNER TO postgres;

--
-- Name: UsersSites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UsersSites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UsersSites_id_seq" OWNER TO postgres;

--
-- Name: UsersSites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UsersSites_id_seq" OWNED BY public."UsersSites".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text,
    username text,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    roles public."Role"[] DEFAULT ARRAY['USER'::public."Role"],
    "refreshTokenHash" text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: File id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."File" ALTER COLUMN id SET DEFAULT nextval('public."File_id_seq"'::regclass);


--
-- Name: Layouts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Layouts" ALTER COLUMN id SET DEFAULT nextval('public."Layouts_id_seq"'::regclass);


--
-- Name: UsersSites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersSites" ALTER COLUMN id SET DEFAULT nextval('public."UsersSites_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."File" (id, path, "createdAt") FROM stdin;
\.


--
-- Data for Name: Layouts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Layouts" (id, layout_data, name, description, path_to_image) FROM stdin;
\.


--
-- Data for Name: UsersSites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UsersSites" (id, user_id, site_data, site_address, site_name) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b3a3dae8-d2be-4e52-bbd1-6f3446e42e68	7559e905a12df60aaf9bf317c3b0a2575868f9140d47138e014692f12d50c1ec	2025-02-16 21:35:00.769427+00	20250118203303_add_desc_and_path	\N	\N	2025-02-16 21:35:00.723754+00	1
69bb1b58-761f-4700-9650-1867c494d023	a4cedd14c73abe88a9ded606e7db4ca5f4c8d36118aab2db159cab51b587ca4a	2025-02-16 21:34:59.940249+00	20241115125826_init	\N	\N	2025-02-16 21:34:59.814795+00	1
729ef137-f9eb-4bb9-a904-5a55c66eceae	4af4ba367bf95add74ce29a354dcbf318b16273930f9f13a894e7a1f9007d38f	2025-02-16 21:34:59.994417+00	20241115170114_init	\N	\N	2025-02-16 21:34:59.947566+00	1
dc5ea9a0-c17e-436b-bc8b-d66c3e53fb88	5b1633615ce4de51f04543355e6b2ce31fbffa83b6870103985ac471ab6c0815	2025-02-16 21:35:00.097199+00	20241115194425_init	\N	\N	2025-02-16 21:35:00.00159+00	1
9dd14ff7-2969-4b32-9df6-6beed5fcde04	02f72958c918daf5ece41daacf5dd4ad5cfb2b85117167eb0851ff80e968d216	2025-02-16 21:35:00.798564+00	20250118204349_layout	\N	\N	2025-02-16 21:35:00.776531+00	1
036916f3-3bc4-459b-9f17-11629bdc9f0f	b9e3fb67a2f40824a1ca4ca31100500035cf1b36de129d19de39681e48f7b726	2025-02-16 21:35:00.176381+00	20241115223445_init	\N	\N	2025-02-16 21:35:00.10416+00	1
fbac1a74-30d4-4dfa-8baf-a6c1f604cbf4	4bcf13504b9815c4355c380f5f08412a598db7b68ecaf4f241fb82faa4d0cdbc	2025-02-16 21:35:00.327904+00	20241115223700_init	\N	\N	2025-02-16 21:35:00.183563+00	1
e5611878-fa86-491f-852c-a1e9e796bae2	68656f356577bdc50f8cbc5d89652349a5bb619ed300c4815c525a220d64e820	2025-02-16 21:35:00.355426+00	20241115233020_fix_name_neccecary	\N	\N	2025-02-16 21:35:00.334894+00	1
27e3d584-97e5-48c4-84eb-e855fbb5b5c8	44f11355b020c58db4a4ccd609bc3e74f342ca4384d7186c6c8bd0727e58e1ae	2025-02-16 21:35:00.386037+00	20241116001704_fix_name_neccecary	\N	\N	2025-02-16 21:35:00.362982+00	1
f2b53a0e-f8da-47fc-a2fa-ab20299ab0a9	ca82948c881bfdff7b7b5c01e6ffbbbddfb95e6c8481396a077ca5ea8292eb9a	2025-02-16 21:35:00.420795+00	20241201200035_update_users_table	\N	\N	2025-02-16 21:35:00.393256+00	1
f6e776a0-8db9-4617-8546-0fa8cdc5b28f	1b9dbbf7c4e9ee447bc2dcaae8ae00e2da5981757882800e9c202af170c08bf2	2025-02-16 21:35:00.551398+00	20250117134643_update_to_string	\N	\N	2025-02-16 21:35:00.427905+00	1
786c402c-ce66-4eb5-97bf-cf77f4f604c3	0cb26e8377219ebeacc5b863bd3129db84345b20328b73df4d7910628fe153f5	2025-02-16 21:35:00.581775+00	20250117140419_add_site_address_field	\N	\N	2025-02-16 21:35:00.558564+00	1
6f0db7fc-66e0-468f-89cc-1c55bc42997f	d62c5cc464ddce6b978f4bea46849388883ddf853af4110968bcdf01c74d7f1d	2025-02-16 21:35:00.610953+00	20250117140748_address_site_not_neccesery	\N	\N	2025-02-16 21:35:00.59048+00	1
c33da605-1598-475e-83fa-83257b033f70	688e6043c03e6c2de15b5f6c54b4e159e32c124b92db7c88a6f98f3a0fbdf721	2025-02-16 21:35:00.642885+00	20250117142849_add_site_name	\N	\N	2025-02-16 21:35:00.618358+00	1
fb35a95b-0223-4f57-8dd0-1fb61ba7235e	0f2521382c7a1f360188b2003f831d4696edaf0e10970ffa421aabc3fda06be3	2025-02-16 21:35:00.716602+00	20250118195902_add_file	\N	\N	2025-02-16 21:35:00.65026+00	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "createdAt", "updatedAt", name, username, email, "passwordHash", roles, "refreshTokenHash") FROM stdin;
1	2025-02-16 21:39:46.213	2025-02-16 21:39:46.93	\N	\N	vovavishniakov856@gmail.com	$2b$10$0CSXTCAJf80VKWjDotCJwei1DwEtvMbDa47vBHbvA1PBsWxeepFOW	{USER}	$2b$10$gZ7PA9dbrRkap0RwBF9LE.RpqeLPCb7xzqhSGnwIyeYJX8/cPzRG6
\.


--
-- Name: File_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."File_id_seq"', 1, false);


--
-- Name: Layouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Layouts_id_seq"', 1, false);


--
-- Name: UsersSites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UsersSites_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: File File_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);


--
-- Name: Layouts Layouts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Layouts"
    ADD CONSTRAINT "Layouts_pkey" PRIMARY KEY (id);


--
-- Name: UsersSites UsersSites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersSites"
    ADD CONSTRAINT "UsersSites_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: UsersSites UsersSites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UsersSites"
    ADD CONSTRAINT "UsersSites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

