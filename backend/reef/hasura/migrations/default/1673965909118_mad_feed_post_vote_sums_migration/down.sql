-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE OR REPLACE VIEW "public"."mad_feed_post_vote_sums" AS
--  SELECT mad_feed_posts.post_id,
--     COALESCE(sum(mad_feed_votes.value), (0)::numeric) AS total,
--     COALESCE((
--         SELECT SUM(auth.mad_feed_votes.value)
--         FROM auth.mad_feed_votes
--         WHERE auth.mad_feed_posts.post_id=auth.mad_feed_votes.post_id
--             AND auth.mad_feed_votes.type = 'VOTE'
--         GROUP BY auth.mad_feed_posts.post_id
--     ), 0)  AS votes,
--     COALESCE((
--         SELECT SUM(auth.mad_feed_votes.value)
--         FROM auth.mad_feed_votes
--         WHERE auth.mad_feed_posts.post_id=auth.mad_feed_votes.post_id
--             AND auth.mad_feed_votes.type = 'BACKPACK'
--         GROUP BY auth.mad_feed_posts.post_id
--     ), 0)  AS backpack
--    FROM (auth.mad_feed_posts
--      LEFT JOIN auth.mad_feed_votes ON ((mad_feed_posts.post_id = mad_feed_votes.post_id)))
--   GROUP BY mad_feed_posts.post_id, auth.mad_feed_votes.post_id;
