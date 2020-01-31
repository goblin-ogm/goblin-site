---
id: about
title: About
description: 'What is Goblin?'
---

Goblin is an asynchronous Python toolkit built on top of TinkerPop 3.

Goblin aims to provide a powerful Object Graph Mapper (OGM) while maintaining a simple, transparent interface. In order to leverage Python's support for asynchronous programming paradigms, Goblin is implemented using the async/await syntax introduced in Python 3.5, and does not support earlier Python versions. Goblin is built on top of aiogremlin and provides full compatibility with the aiogremlin GLV and driver.

## Features

* High level asynchronous Object Graph Mapper (OGM)
* Integration with the official gremlin-python Gremlin Language Variant (GLV) - now provided by aiogremlin
* Native Python support for asynchronous programing including coroutines, iterators, and context managers as specified in PEP 492
* Asynchronous Python driver for the Gremlin Server - now provided by aiogremlin
* Async Graph implementation that produces native Python GLV traversals - now provided by aiogremlin

## Where it is

All code is hosted on [our QOTO GitLab](https://git.qoto.org/goblin-ogm) specifically the [Goblin repository](https://git.qoto.org/goblin-ogm/goblin).

## Current Status

[![tests](http://git.qoto.org/goblin-ogm/goblin/badges/master/pipeline.svg)](http://git.qoto.org/goblin-ogm/goblin/commits/master)
[![Requirements](https://requires.io/github/goblin-ogm/goblin/requirements.svg?branch=master)](https://requires.io/github/goblin-ogm/goblin/requirements/?branch=master)
[![test coverage](http://git.qoto.org/goblin-ogm/goblin/badges/master/coverage.svg)](http://git.qoto.org/goblin-ogm/goblin/commits/master)
[![codecov](https://codecov.io/gh/goblin-ogm/goblin/branch/master/graph/badge.svg)](https://codecov.io/gh/goblin-ogm/goblin)
[![Codacy](https://api.codacy.com/project/badge/Grade/7d7e40a92482485c851e303cfbf5eb39)](https://www.codacy.com/gh/goblin-ogm/goblin)
[![Scrutinizer](https://img.shields.io/scrutinizer/quality/g/goblin-ogm/goblin/master.svg?style=flat)](https://scrutinizer-ci.com/g/goblin-ogm/goblin)

[![PyPi](https://img.shields.io/pypi/v/goblin.svg?style=flat)](https://pypi.python.org/pypi/goblin)
[![Supported Versions](https://img.shields.io/pypi/pyversions/goblin.svg?style=flat)](https://pypi.python.org/pypi/goblin)
[![Downloads](https://img.shields.io/pypi/dm/goblin.svg?style=flat)](https://pypi.python.org/pypi/goblin)
[![SemVer](https://img.shields.io/badge/SemVer-v2.0.0-green)](https://semver.org/spec/v2.0.0.html)
[![docs](https://readthedocs.org/projects/goblin/badge/?version=latest)](https://goblin.readthedocs.io/en/latest/)
[![Gitter](https://badges.gitter.im/goblin-ogm/goblin.svg)](https://gitter.im/goblin-ogm/goblin)
