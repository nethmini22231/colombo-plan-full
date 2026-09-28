package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "member_portal_items")
public class MemberPortalItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pageTag;          // "REGIONAL COOPERATION & DEVELOPMENT HUB"
    private String pageTitle;        // "Member Countries Portal"
    private String pageDescription;  // intro paragraph

    private String badge;            // "Public Resource" or "Members Only"
    private String title;            // "Training Opportunities"
    private String slug;             // "training-opportunities"
    private String linkUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String bulletPoints;     // one per line

    private String thumbnailUrl;
    private Integer sortOrder;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPageTag() { return pageTag; }
    public void setPageTag(String pageTag) { this.pageTag = pageTag; }

    public String getPageTitle() { return pageTitle; }
    public void setPageTitle(String pageTitle) { this.pageTitle = pageTitle; }

    public String getPageDescription() { return pageDescription; }
    public void setPageDescription(String pageDescription) { this.pageDescription = pageDescription; }

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

    public String getBulletPoints() { return bulletPoints; }
    public void setBulletPoints(String bulletPoints) { this.bulletPoints = bulletPoints; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
}