package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "private_sector_content")
public class PrivateSectorContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;           // PRIVATE SECTOR
    private String slug;            // private-sector
    private String regionTag;       // උදා: Global Outreach හෝ වෙනත් Tag එකක්
    private String focalPoint;      // Pulsara G

    @Column(columnDefinition = "TEXT")
    private String description;     // Workforce upskilling, partnerships and CSR opportunities

    @Column(columnDefinition = "TEXT")
    private String whatWeOffer;     // සේවාවන් ලැයිස්තුව

    @Column(columnDefinition = "TEXT")
    private String csrPartnerships; // CSR Partnerships විස්තරය

    private String thumbnailUrl;    // කාඩ් එකේ පෙනෙන ඉමේජ් එක

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getRegionTag() { return regionTag; }
    public void setRegionTag(String regionTag) { this.regionTag = regionTag; }
    public String getFocalPoint() { return focalPoint; }
    public void setFocalPoint(String focalPoint) { this.focalPoint = focalPoint; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getWhatWeOffer() { return whatWeOffer; }
    public void setWhatWeOffer(String whatWeOffer) { this.whatWeOffer = whatWeOffer; }
    public String getCsrPartnerships() { return csrPartnerships; }
    public void setCsrPartnerships(String csrPartnerships) { this.csrPartnerships = csrPartnerships; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
}