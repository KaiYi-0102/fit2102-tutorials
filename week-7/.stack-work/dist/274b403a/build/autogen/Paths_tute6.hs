{-# LANGUAGE CPP #-}
{-# LANGUAGE NoRebindableSyntax #-}
{-# OPTIONS_GHC -fno-warn-missing-import-lists #-}
module Paths_tute6 (
    version,
    getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

#if defined(VERSION_base)

#if MIN_VERSION_base(4,0,0)
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#else
catchIO :: IO a -> (Exception.Exception -> IO a) -> IO a
#endif

#else
catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
#endif
catchIO = Exception.catch

version :: Version
version = Version [0,1,0,0] []
bindir, libdir, dynlibdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\bin"
libdir     = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\lib\\x86_64-windows-ghc-8.10.3\\tute6-0.1.0.0-5kp9AhuQkG63CgngAzV5tY"
dynlibdir  = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\lib\\x86_64-windows-ghc-8.10.3"
datadir    = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\share\\x86_64-windows-ghc-8.10.3\\tute6-0.1.0.0"
libexecdir = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\libexec\\x86_64-windows-ghc-8.10.3\\tute6-0.1.0.0"
sysconfdir = "C:\\Users\\Kai Yi\\Desktop\\Monash Computer Science C2001\\FIT2102\\Tutorial\\fit2102-tutorials\\week-7\\.stack-work\\install\\93b0c5b0\\etc"

getBinDir, getLibDir, getDynLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "tute6_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "tute6_libdir") (\_ -> return libdir)
getDynLibDir = catchIO (getEnv "tute6_dynlibdir") (\_ -> return dynlibdir)
getDataDir = catchIO (getEnv "tute6_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "tute6_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "tute6_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "\\" ++ name)
