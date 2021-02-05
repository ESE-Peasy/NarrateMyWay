---
nav_order: 1
title: Accessibility 
parent: Coding Style Guide
---

# Writing Accessible Code

## Screen reader compatibility
Screen readers can be used to narrate on-screen content to the user. In Android this may be referred to as *Voice Assistant* and under iOS *VoiceOver*.

At the bare minimum the React Native code should have two things added to make a widget compatible:
1. An "accessible" label
1. The accessibility text

The text used in the label must be informative, concise, and should not rely on unnecessarily visual descriptions to ensure effectiveness for visually impaired users.

A sample code snippet for an accessible image is:


{% raw %}
```tsx
<Image
    accessible={true}                             // Label to indicate an accessible widget
    source={require('../assets/images/icon.png')}
    style={{ width: 100, height: 100 }}
    accessibilityLabel="Accessible image"         // The text to be read as a description of the widget
  />
```
{% endraw %}
