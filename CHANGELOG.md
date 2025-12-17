# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- Format:
##[] - 

### Added

### Changed

### Fixed

### Removed

 -->

## [[v0.3.3](https://github.com/ngntrgduc/Multiple-links-loader/releases/tag/v0.3.3)]

Firefox

### Added
- Auto open links in background when delayed (links exceed threshold)

### Fixed
- Delay mechanism by using `Promise` instead of `setTimeout`
- Remain active links < limit but it still add delay