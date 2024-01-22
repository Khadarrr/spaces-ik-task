MVP Project Report - Event Posting and Management Site

Introduction
The MVP project aimed to create an event site that allows users to post and manage events(later for something). The primary technologies utilized for the project were Next.js with TypeScript. The project also integrated data storage using Supabase, including event information and coordinates for mapping. The deployment through Vercel.



Supabase was selected as the database solution for storing event information. Its simplicity and real-time capabilities were key factors in the decision, first time doing using it.

LeafletMap:
The LeafletMap library was employed to display maps on the site. It was utilized to showcase event locations through coordinates.
Vercel:

Vercel served as the deployment platform for the project. Its seamless integration with Next.js and ease of use were instrumental in deploying the site efficiently.
MVP Features
Event Posting:

Users can post events by providing essential details such as event name, date, time, location, and a brief description.
Event Management:

A straightforward interface enables users to manage their posted events. They can edit or delete events as needed.

Event data is stored in Supabase, allowing for efficient data management and retrieval.
Map Integration:

Coordinates associated with each event are utilized to display interactive maps using LeafletMap, providing users with a visual representation of event locations.
Challenges Faced
Learning Curve:

As it was the first time using Next.js with TypeScript, there was a learning curve. However, this challenge was overcome by leveraging documentation and community resources.
Map Integration Issues:

Challenges were encountered during the integration of LeafletMap for displaying event locations. Debugging and troubleshooting were necessary, but a satisfactory solution was achieved.

Conclusion

The initiation of the MVP project marked a promising beginning, though there is room for further integration in the future. Collaborative consultations with Kristoffer greatly aided in identifying key focal points and enhancing time management throughout the development process.
Notably, transitioning from JavaScript to TypeScript for the first time posed a unique set of challenges during the deployment phase. The slightly extended deployment duration was attributed to TypeScript's stricter rules, presenting a learning curve. However, this experience has proven invaluable, providing a deeper understanding of TypeScript nuances for future projects. The collaborative effort and challenges encountered have laid a solid foundation for future improvements and iterations on the project.