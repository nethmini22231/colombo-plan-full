package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "government_institutions")
public class GovernmentInstitution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private String regionTag;
    private String contactPerson;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String thumbnailUrl; // Thumbnail image එක සඳහා
    private String attachmentUrl; // Image එකක් හෝ PDF එකක් සඳහා

    @Column(columnDefinition = "TEXT")
    private String cardsJson;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getRegionTag() { return regionTag; }
    public void setRegionTag(String regionTag) { this.regionTag = regionTag; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getAttachmentUrl() { return attachmentUrl; }
    public void setAttachmentUrl(String attachmentUrl) { this.attachmentUrl = attachmentUrl; }
    public String getCardsJson() { return cardsJson; }
    public void setCardsJson(String cardsJson) { this.cardsJson = cardsJson; }
}