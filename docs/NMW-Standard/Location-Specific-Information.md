---
nav_order: 1
title: Location Specific Information
parent: NMW Standard
---

# Location Specific Information

This page details the implementation of UUID-based location-specific information transferral.

## Downloading Expansion Pack

Once the app has discovered a URL to download an expansion pack from, this download will commence (subject to user confirmation). The will currently consist of downloading a JSON file with the following structure:

```json
{
  "<UUID>": {
    "nmw": "<NMW Code>",
    "name": "<Name of location>",
    "description": "<Description of location>",
    "website": "<Optional website for location>"
  }
}
```

Example files with this structure can be found [here](https://github.com/ESE-Peasy/NarrateMyWay/example_expansion_packs).
