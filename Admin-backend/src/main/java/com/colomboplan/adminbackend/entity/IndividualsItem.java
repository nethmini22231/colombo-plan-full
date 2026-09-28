package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "individuals_items")
public class IndividualsItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sectionTitle;      // e.g. "DAP e-learning platform"
    private String sectionSubtitle;   // e.g. "Self-paced learning on..."

    private String badge;             // e.g. "E-Learning", "Archives"
    private String title;             // e.g. "Browse Courses"
    private String slug;              // e.g. "courses", "archives"
    private String linkUrl;           // e.g. "/individuals/courses"

    @Column(columnDefinition = "TEXT")
    private String description;

    private String thumbnailUrl;
    private Integer sortOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSectionTitle() { return sectionTitle; }
    public void setSectionTitle(String sectionTitle) { this.sectionTitle = sectionTitle; }

    public String getSectionSubtitle() { return sectionSubtitle; }
    public void setSectionSubtitle(String sectionSubtitle) { this.sectionSubtitle = sectionSubtitle; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getLinkUrl() { return linkUrl; }
    public void setLinkUrl(String linkUrl) { this.linkUrl = linkUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}