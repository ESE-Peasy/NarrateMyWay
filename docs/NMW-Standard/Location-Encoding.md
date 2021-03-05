---
nav_order: 1
title: Location Encoding
parent: NMW Standard
---

<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>

# Location Encoding

[Click here to scroll to the table of codes](#32){: .btn }

## Outline

Part of the NarrateMyWay project is concerned with the development of a language agnostic method for encoding locations. This also needs to be done in an efficient way as some beacon technologies are limiting in the length of data that can be advertised to devices. Location encodings should also be useable in an off-line manner so travelling to a new location doesn't require using mobile data. Further expansions can be made possible that could require further downloads.

To summarise, the fundamental points of importance are:

- Locations should be encoded in a way that is language agnostic
- The fundamental encoding should be static, i.e., not require mobile data functionality
  - Expansion encodings may require further downloads and be more dynamic
- The encoding should be compact

## Encoding Pattern

### 1. Hierarchical Encoding

The locations should be encoded in a hierarchical manner, with each level being more specific than the last.

#### 1.1.

The location code is always presented in plaintext in a human-readable format and will consist of a `nmw:` label, followed by three fields, each separated by a dash (`-`) character.

An example location encoding could therefore be `nmw:1-42-1`.

#### 1.2.

Each field consists of characters from zero to nine and *A* to *Z*. Any alphabetic characters in the location fields should be presented in upper-case form, although the standard is case-insensitive, so lower-case characters should not cause a failure.

#### 1.3.

Each field has a maximum character length that must not be exceeded, but leading zeros may be omitted. This means a field containing `001` is equivalent to a field containing `1`.

The following character length limits apply to the fields:

- Top-level category\\
    **Length**: 2 characters\\
    **Max. categories**: 1296
- Subcategory\\
    **Length**: 3 characters\\
    **Max. categories**: 46656
- Subsubcategory\\
    **Length**: 3 characters\\
    **Max. categories**: 46656


The complete location code can therefore be up to 14 characters long.

#### 1.4

The three location fields in the location code are defined by this standard and no other meanings should be associated with the location codes.

#### 1.5.

Only the first field must be defined in any implementation of the standard. It may be that in some languages or cultures it does not make sense to have a translation at all levels of the hierarchy, but any localisation/regionalisation of the system should have translations for the top-level field.

If any level in the hierarchy is not to be defined this field should be set to `0`. A location code shall be read from left to right, where any fields to the right of a `0` are to be ignored. This means `nmw:1-0-0` and `nmw:1-0-5` have the same meaning, although the latter format is discouraged, because the meaning is not as clear.

_See [§3.1](#31) for a description of what a top-level category of `0` means._

### 2. Unique location identification

The NMW standard allows for additional information to be supplied for locations. This is bound to a [Bluetooth UUID](https://www.bluetooth.com/specifications/assigned-numbers/) for unique identification of locations.

#### 2.1.

UUIDs must be transmitted independently of the location encoding described in [§1](#1).

#### 2.2.

Each location may have a UUID, but it does not need to have one for this standard.

#### 2.3.

Each location's UUID maps to information about that location. This consists of:

| Location attribute | Required? | Max. length | Description |
|--------------------|-----------|-------------|-------------|
| NMW location code  | Yes       | See [§1.3](#13) | The location code according to this standard |
| Name               | Yes       | 25 chars.   | A name for the location. This could be, for example the name of a business |
| Description        | Yes       | 140 chars.  | An optional field that should only be used if the nature of the location is not clear from the name |
| Website            | No        | -           | This is optional and should only be present if the website is accessible for visually impaired users |

All information provided by this mechanism is intended to be narrated and concise messages are therefore important. For this reason the *name* and *description* fields have a strict character limit.

#### 2.4.

Audio description of a location based on looking up the location's UUID takes precedence of narration based on the location code. If required information is missing or there is no UUID for a location, the system should fall back to giving a generic narration for the location code.

### 3. Location Codes

This section documents specific codes and their meanings.

#### 3.1.

The top-level field code of zero is reserved for private usage. This allows a private network of beacons to be deployed that broadcast a code of `nmw:0-0-0`, where the meaning of sub/subsubcategory fields is undefined in the standard and therefore not known by passers-by. It is not recommended for general usage as this reduces the effectiveness of the standard. It should only be used for private deployments where **all** potential users are able to download location descriptions based on beacon UUIDs.

#### 3.2.

Incomplete
{: .label .label-yellow}

Locations are defined as in the following table. Note that these are English translations of the codes and so the meaning in some languages/cultures may not exist at all levels.

<table class="display">
<colgroup>
<col width="10%" />
<col width="90%" />
</colgroup>

<thead>
  <tr class="header">
    <th>Code</th>
    <th>Meaning</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td markdown="span" ><big style="font-size:120%">**1**</big>-0-0</td>
    <td markdown="span">**General navigation markers**</td>
  </tr>
  <tr>
    <td markdown="span">**1-1**-0</td>
    <td markdown="span">**Warnings/dangerous area**</td>
  </tr>
  <tr>
    <td markdown="span">1-1-1</td>
    <td markdown="span">General caution/warning</td>
  </tr>
  <tr>
    <td markdown="span">**1-2**-0</td>
    <td markdown="span">**Information point**</td>
  </tr>
  <tr>
    <td markdown="span">1-2-1</td>
    <td markdown="span">Visual-only navigation sign</td>
  </tr>
  <tr>
    <td markdown="span">1-2-2</td>
    <td markdown="span">Audio-accessible information point</td>
  </tr>
  <tr>
    <td markdown="span"><big style="font-size:120%">**2**</big>-0-0</td>
    <td markdown="span">**Education**</td>
  </tr>
  <tr>
    <td markdown="span">**2-1**-0</td>
    <td markdown="span">**Classrooms**</td>
  </tr>
  <tr>
    <td markdown="span">2-1-1</td>
    <td markdown="span">Classroom</td>
  </tr>
  <tr>
    <td markdown="span">2-1-2</td>
    <td markdown="span">Lecture theatre</td>
  </tr>
  <tr>
    <td markdown="span">**2-2**-0</td>
    <td markdown="span">**Practical rooms**</td>
  </tr>
  <tr>
    <td markdown="span">2-2-1</td>
    <td markdown="span">Workshop</td>
  </tr>
  <tr>
    <td markdown="span">2-2-2</td>
    <td markdown="span">Laboratory</td>
  </tr>
  <tr>
    <td markdown="span"><big style="font-size:120%">**3**</big>-0-0</td>
    <td markdown="span">**Food/drink venues**</td>
  </tr>
  <tr>
    <td markdown="span"><big style="font-size:120%">**4**</big>-0-0</td>
    <td markdown="span">**Transport**</td>
  </tr>
</tbody>
</table>

<script type="text/javascript">
$(document).ready( function () {
    $('table.display').DataTable();
} );
</script>
