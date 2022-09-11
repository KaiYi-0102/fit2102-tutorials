module Examples where

import           Prelude
import           Data.List
import           Data.Ord
import           Data.Function

-- $setup

-- | Sorting a list by length.
--
-- >>> sortList [[1,2,3], [1,2]]
-- [[1,2],[1,2,3]]
--
-- Hint: A useful function here is sortOn
sortList :: [[a]] -> [[a]]
sortList = sortOn length

-- | Finding the largest list.
--
-- >>> longestList [[1,2,3], [1,2]]
-- [1,2,3]
longestList :: [[a]] -> [a]
longestList a = last $ sortList a

-- | Finding the sumProduct of two lists.
--
-- >>> sumProduct [1,2,3] [1,2,4]
-- 17
-- 
-- 1*1 + 2*2 + 3*4 = 1+4+12
sumProduct :: [Int] -> [Int] -> Int
sumProduct a b = sum $ zipWith (*) a b

-- | Group consecutive elements which are equal after applying function
--
-- >>> groupEqual id [1,1,1,1,2,2,2,2,2,3,4]
-- [[1,1,1,1],[2,2,2,2,2],[3],[4]]
-- >>> groupEqual (`mod` 5) [5,5,5,5,10,10,10,15,15,15]
-- [[5,5,5,5,10,10,10,15,15,15]]
-- 
-- Hint: A useful function here is groupBy and on
groupEqual :: Eq b => (a -> b) -> [a] -> [[a]]
groupEqual f = groupBy ((==) `on` f)

-- | Apply function to every element in a nested list
--
-- >>> nestedMap (+1) [[1,2,3], [4,5,6], [7,8,9]]
-- [[2,3,4],[5,6,7],[8,9,10]]
-- 
-- x is drawn from xs and for every x (list), map it to function f
nestedMap :: (a -> b) -> [[a]] -> [[b]]
nestedMap f xs = [ map f x | x <- xs ]
