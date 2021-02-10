---
nav_order: 1
title: Location Encoding
parent: NMW Standard
---

# Location Encoding

## Outline
Part of the NarrateMyWay project is concerned with the development of a language agnostic method for encoding locations. This also needs to be done in efficient way as some beacon technologies are limiting in the length of data that can be advertised to devices. Location encodings should also be useable in an off-line manner so travelling to a new location doesn't require using mobile data. Further expansions can be made possible that could require further downloads.

To summarise, the fundamental points of importance are:
- Locations should be encoded in a way that is language agnostic 
- The fundamental encoding should be static, i.e., not require mobile data functionality
  - Expansion encodings may require further downloads and be more dynamic
- The encoding should be compact

## Encoding Pattern

### 1. Hierarchical Encoding
The locations should be encoded in a hierarchical manner, with each level being more specific than the last.

An example location encoding could therefore be `1.42.0.0`. 

#### 1.1.
A location code will consist of four fields.

#### 1.2.
The length of each field is fixed to one byte, so the location type encoding is four bytes long in total.

#### 1.3
The first three fields are reserved by this standard, with the fourth field being unreserved. An organisation may release a customised mapping for codes in the fourth field. See [here (link TBC)]() for more information on how this works.

*[§2.1](21) is an exception to this*

#### 1.4.
Only the first field must be defined in any implementation of the standard. It may be that in some languages or cultures it does not make sense to have a translation at all levels of the hierarchy, but any localisation/regionalisation of the system should have translations for the top-level field.

#### 1.5.
When written as text, each field will be separated by a dot/period (`.`). Each field is written as a number in the inclusive interval [0,255].


### 2. Location Codes
This section documents specific codes and their meanings.

#### 2.1.
The top-level field code of zero is reserved for private usage. This allows a private network of beacons to be deployed that broadcast a code of `0.X.X.X`, where the meaning of fields is undefined in the standard and therefore not known by passers-by. This is the only case in which organisations may redefine any codes defined in this standard. It is not recommended for general usage as this reduces the effectiveness of the standard. It should only be used for private deployments where **all** potential users are able to download location code definitions for this custom deployment.

*This is an exception to [§1.3](#13)*

#### 2.2.
Incomplete
{: .label .label-yellow}

Locations are defined as in the following table. Note that these are English translations of the codes and so the meaning in some languages/cultures may not exist at all levels.

| Code            | Meaning |
|-----------------|---------|
| ***1***         | ***General navigation markers*** |
| **1.0**         | **Warnings/dangerous area** |
| 1.0.0           | General caution/warning |
| **1.1**         | **Information point** |
| 1.1.0           | Visual-only navigation sign |
| 1.1.1           | Audio-accessible information point |
| ***2***         | ***Education*** |
| ***3***         | ***Food/drink venues*** |
| ***4***         | ***Transport*** |
