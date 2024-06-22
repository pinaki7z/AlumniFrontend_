<div className='iforum'>
        <div className='iforum-1'>
          {forum && (
            <>
              {(forum.userId === profile._id || admin) && forum.type === 'Private' && (
                <div>
                  <Link to={`/forums/${id}/members`}>
                    <p>Manage forum members</p>
                  </Link>

                </div>
              )}
              <div>
                {(forum.userId === profile._id || admin) && forum.type === 'Private' && (<IconButton onClick={() => handleDeletePost(forum._id)} className='delete-button'>
                  <DeleteRounded />
                </IconButton>)}
                <h1 style={{ fontFamily: 'sans-serif', fontWeight: 500, fontSize: 30, marginTop: '1em' }}>
                  {forum.title}
                </h1>
                <p style={{ fontWeight: 500, fontSize: 20 }} dangerouslySetInnerHTML={{ __html: forum.description }}></p>
                {forum.picture && (
                  <img
                    src={forum.picture}
                    alt="Forum Image"
                    style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px', paddingBottom: '10px' }}
                  />
                )}
              </div>
            </>
          )}
        </div>

      </div>
      <Routes>
        <Route path="/" element={
          forum && (
            (forum.type === 'Public' || forum.comment === true || profile.profileLevel === 0 || forum.userId === profile._id || members.includes(profile._id)) ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#F5F5F5', margin: '20px 0px' }}>
                <div style={{ width: '60%', padding: '30px' }}>
                  {forum && (
                    <>
                      {blockedUserIds.some(item => item.userId === profile._id && !item.sent) ? (
                        <>
                          <p>You have been blocked for the comment: <span style={{ fontWeight: '500' }}>{blockedUserIds.find(item => item.userId === profile._id).content}</span>.  Click <span onClick={() => reportToSuperAdmin(blockedUserIds.find(item => item.userId === profile._id).commentId, blockedUserIds.find(item => item.userId === profile._id).content, forum.title, forum._id)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>here</span> to report to Super Admin
                          </p>
                        </>
                      ) : blockedUserIds.some(item => item.userId === profile._id && item.sent === true) ? (
                        <>
                          Reported to super admin.Please wait while it is being verified.
                        </>
                      ) :
                        (
                          <CommentSection
                            comments={forum.comments ? filterReportedComments(forum.comments) : null}
                            entityId={id}
                            entityType="forums"
                            onCommentSubmit={refreshComments}
                            onDeleteComment={refreshComments}
                          />
                        )}
                    </>
                  )}

                </div>
              </div>
            ) : (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0px' }}>
                <button onClick={() => handleJoinForum(forum.userId, forum._id, profile._id, forum.title, profile.firstName, profile.lastName)} style={{ width: '20%', backgroundColor: 'greenyellow', padding: '10px', borderRadius: '8px', border: 'none' }}>{requestStatus}</button>
              </div>
            )
          )
        } />
        <Route path={`/members/*`} element={<AddMembers type='forums' />} />
      </Routes>